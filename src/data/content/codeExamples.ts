// Code examples for toolkit items
import { CodeExample } from '../../types';

// Type definitions
export interface CodeExamplesMap {
  [key: string]: CodeExample[];
}

// Code examples for different tools
export const codeExamplesMap: CodeExamplesMap = {
  // PSD2 Reference Architecture
  "psd2-architecture": [
    {
      title: "Strong Customer Authentication Implementation",
      description: "This example shows how to implement strong customer authentication (SCA) in a TypeScript application for PSD2 compliance.",
      language: "typescript",
      filePath: "src/auth/strong-customer-authentication.ts",
      code: `import * as crypto from 'crypto';
import { Request } from 'express';

interface SCAChallengeOptions {
  userId: string;
  validityPeriod: number; // in seconds
  metadata?: Record<string, any>;
}

interface SCAChallenge {
  challengeId: string;
  challengeData: string;
  expiresAt: Date;
  metadata?: Record<string, any>;
}

interface SCAVerifyOptions {
  challengeId: string;
  challengeResponse: string;
}

interface SCAExemptionChecks {
  amount: number;
  currency: string;
  isRecurringPayment: boolean;
  isMerchantInitiated: boolean;
  isLowValueTransaction: boolean;
  transactionRiskAnalysis: {
    riskScore: number;
    fraudRate: number;
  };
  paymentMethod: string;
}

export class StrongCustomerAuthentication {
  private readonly secretKey: string;
  
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  
  /**
   * Generate a Strong Customer Authentication challenge
   * @param options Challenge generation options
   * @returns SCA Challenge object
   */
  public generateChallenge(options: SCAChallengeOptions): SCAChallenge {
    const { userId, validityPeriod, metadata } = options;
    
    // Create a random challenge
    const challengeData = crypto.randomBytes(32).toString('hex');
    
    // Create a challenge ID
    const challengeId = crypto.createHash('sha256')
      .update(userId + Date.now().toString() + challengeData)
      .digest('hex');
    
    // Set expiration time
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + validityPeriod);
    
    return {
      challengeId,
      challengeData,
      expiresAt,
      metadata
    };
  }
  
  /**
   * Verify a Strong Customer Authentication challenge response
   * @param options Verification options
   * @returns boolean indicating if verification was successful
   */
  public verifyChallenge(options: SCAVerifyOptions): boolean {
    // In a real implementation, you would:
    // 1. Retrieve the original challenge from a database using challengeId
    // 2. Check if the challenge is still valid (not expired)
    // 3. Verify the challenge response against the challenge data
    // 4. Implement additional security checks
    
    // This is a simplified implementation for demo purposes
    const { challengeId, challengeResponse } = options;
    
    // Verify the response (in a real scenario, this would involve checking
    // against stored challenge data and validating cryptographic signatures)
    const isValid = challengeResponse.length > 0 && challengeId.length > 0;
    
    return isValid;
  }
  
  /**
   * Generate an authentication token after successful SCA
   * @param userId The user ID
   * @param scopes The permission scopes for the token
   * @returns Authentication token
   */
  public generateAuthToken(userId: string, scopes: string[]): string {
    // In a real implementation, you would use a JWT library
    // This is a simplified example
    const payload = {
      sub: userId,
      scopes,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }
  
  /**
   * Check if a transaction is exempt from SCA under PSD2 rules
   * @param checks Exemption check parameters
   * @returns boolean indicating if the transaction is exempt
   */
  public isSCAExempt(checks: SCAExemptionChecks): boolean {
    const { amount, currency, isRecurringPayment, isLowValueTransaction, 
            transactionRiskAnalysis, isMerchantInitiated, paymentMethod } = checks;
    
    // Low value transaction exemption (≤ €30)
    if (isLowValueTransaction && currency === 'EUR' && amount <= 30) {
      return true;
    }
    
    // Merchant initiated transaction exemption
    if (isMerchantInitiated && isRecurringPayment) {
      return true;
    }
    
    // Transaction risk analysis exemption
    // Different thresholds based on the PSP's fraud rate
    if (transactionRiskAnalysis.riskScore < 25) {
      if (transactionRiskAnalysis.fraudRate < 0.13 && amount <= 100) {
        return true;
      } else if (transactionRiskAnalysis.fraudRate < 0.06 && amount <= 250) {
        return true;
      } else if (transactionRiskAnalysis.fraudRate < 0.01 && amount <= 500) {
        return true;
      }
    }
    
    // Corporate payment exemption
    if (paymentMethod === 'corporate') {
      return true;
    }
    
    return false;
  }
  
  /**
   * Extract SCA header from request
   * @param req Express request object
   * @returns SCA header value or null
   */
  public extractSCAHeaderFromRequest(req: Request): string | null {
    const scaHeader = req.headers['x-sca-token'];
    return Array.isArray(scaHeader) ? scaHeader[0] : scaHeader || null;
  }
}
`
    },
    {
      title: "Consent Management API",
      description: "This example demonstrates how to implement a consent management API for PSD2 account information service providers (AISPs).",
      language: "typescript",
      filePath: "src/api/consent-controller.ts",
      code: `import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { StrongCustomerAuthentication } from '../auth/strong-customer-authentication';

// Create a router
const router: Router = express.Router();

// Initialize the SCA service
const scaService = new StrongCustomerAuthentication(process.env.SCA_SECRET_KEY || 'default-secret-key');

// Create a new consent
router.post('/consents', [
  // Validate request body
  body('access.accounts').isArray().withMessage('Accounts must be an array'),
  body('access.balances').isArray().withMessage('Balances must be an array'),
  body('access.transactions').isArray().withMessage('Transactions must be an array'),
  body('recurringIndicator').isBoolean().withMessage('recurringIndicator must be a boolean'),
  body('validUntil').isISO8601().withMessage('validUntil must be a valid date'),
  body('frequencyPerDay').isInt({ min: 1, max: 4 }).withMessage('frequencyPerDay must be between 1 and 4')
], async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array(),
      error: 'FORMAT_ERROR',
      message: 'Format of certain request fields are not matching the requirements'
    });
  }
  
  try {
    // Extract request data
    const { access, recurringIndicator, validUntil, frequencyPerDay } = req.body;
    
    // Create a new consent object
    const consentId = randomUUID();
    const consentStatus = 'RECEIVED';
    
    // Generate an SCA challenge for the consent
    const challenge = scaService.generateChallenge({
      userId: req.headers['x-psu-id'] as string || 'anonymous',
      validityPeriod: 300, // 5 minutes
      metadata: { consentId }
    });
    
    // In a real implementation, you would store the consent and challenge in a database
    
    // Return the consent response with _links for next steps
    return res.status(201).json({
      consentId,
      consentStatus,
      _links: {
        scaRedirect: {
          href: \`https://auth.example.com/sca-challenge?id=\${challenge.challengeId}\`
        },
        status: {
          href: \`/consents/\${consentId}/status\`
        },
        self: {
          href: \`/consents/\${consentId}\`
        }
      }
    });
  } catch (error) {
    console.error('Error creating consent:', error);
    return res.status(500).json({ 
      error: 'INTERNAL_SERVER_ERROR', 
      message: 'An error occurred while processing the request' 
    });
  }
});

// Get consent status
router.get('/consents/:consentId/status', async (req: Request, res: Response) => {
  try {
    const { consentId } = req.params;
    
    // In a real system, fetch consent from database
    // This is mock data for the example
    const consentStatus = 'VALID';
    
    return res.status(200).json({
      consentStatus
    });
  } catch (error) {
    console.error('Error getting consent status:', error);
    return res.status(500).json({ 
      error: 'INTERNAL_SERVER_ERROR', 
      message: 'An error occurred while retrieving the consent status' 
    });
  }
});

// Get consent details
router.get('/consents/:consentId', async (req: Request, res: Response) => {
  try {
    const { consentId } = req.params;
    
    // In a real system, fetch consent from database
    // Return 404 if not found
    // This is mock data for the example
    const consent = {
      consentId,
      access: {
        accounts: [
          { iban: 'DE89370400440532013000', currency: 'EUR' }
        ],
        balances: [
          { iban: 'DE89370400440532013000', currency: 'EUR' }
        ],
        transactions: [
          { iban: 'DE89370400440532013000', currency: 'EUR' }
        ]
      },
      recurringIndicator: true,
      validUntil: '2025-12-31',
      frequencyPerDay: 4,
      lastActionDate: new Date().toISOString(),
      consentStatus: 'VALID'
    };
    
    return res.status(200).json(consent);
  } catch (error) {
    console.error('Error getting consent details:', error);
    return res.status(500).json({ 
      error: 'INTERNAL_SERVER_ERROR', 
      message: 'An error occurred while retrieving the consent details' 
    });
  }
});

// Helper function to generate a UUID
function randomUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default router;`
    }
  ],
  
  // Serverless Architecture Design
  "serverless-architecture": [
    {
      title: "AWS Lambda Transaction Processor",
      description: "This example demonstrates how to implement a serverless transaction processor using AWS Lambda.",
      language: "javascript",
      filePath: "src/lambda/processTransaction.js",
      code: `const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const SNS = new AWS.SNS();

exports.handler = async (event) => {
  console.log('Processing transaction event:', JSON.stringify(event));
  
  try {
    // For API Gateway requests, the transaction is in the body
    let transaction;
    if (event.body) {
      transaction = JSON.parse(event.body);
    } else {
      // For direct invocations or SQS events
      transaction = event;
    }
    
    // Validate transaction
    const validationError = validateTransaction(transaction);
    if (validationError) {
      return formatResponse(400, { error: validationError });
    }
    
    // Add metadata to the transaction
    const processedTransaction = {
      ...transaction,
      transactionId: transaction.transactionId || generateTransactionId(),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store the transaction in DynamoDB
    await dynamoDB.put({
      TableName: "banking-transactions-dev",
      Item: processedTransaction
    }).promise();
    
    // Publish transaction event to SNS for async processing
    await SNS.publish({
      TopicArn: process.env.TRANSACTION_TOPIC_ARN,
      Message: JSON.stringify({
        type: 'TRANSACTION_CREATED',
        data: processedTransaction
      }),
      MessageAttributes: {
        TransactionType: {
          DataType: 'String',
          StringValue: transaction.type || 'PAYMENT'
        }
      }
    }).promise();
    
    // Return success response
    return formatResponse(200, {
      transactionId: processedTransaction.transactionId,
      status: processedTransaction.status,
      message: 'Transaction processed successfully'
    });
  } catch (error) {
    console.error('Error processing transaction:', error);
    return formatResponse(500, {
      error: 'Failed to process transaction',
      message: error.message
    });
  }
};

function validateTransaction(transaction) {
  if (!transaction) {
    return 'Transaction data is required';
  }
  
  if (!transaction.amount || isNaN(Number(transaction.amount))) {
    return 'Valid transaction amount is required';
  }
  
  if (!transaction.currency || transaction.currency.length !== 3) {
    return 'Valid currency code is required';
  }
  
  if (!transaction.sourceAccount) {
    return 'Source account is required';
  }
  
  if (!transaction.destinationAccount) {
    return 'Destination account is required';
  }
  
  return null;
}

function generateTransactionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function formatResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  };
}`
    },
    {
      title: "AWS CloudFormation Template for Serverless Banking API",
      description: "This example shows how to define a serverless banking API infrastructure using AWS CloudFormation.",
      language: "yaml",
      filePath: "infrastructure/serverless-banking-api.yaml",
      code: `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Serverless Banking API Infrastructure'

Parameters:
  Environment:
    Type: String
    Default: dev
    AllowedValues:
      - dev
      - test
      - prod
    Description: Deployment environment

Resources:
  # DynamoDB Tables
  TransactionsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: "banking-transactions-dev"
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: transactionId
          AttributeType: S
        - AttributeName: accountId
          AttributeType: S
        - AttributeName: createdAt
          AttributeType: S
      KeySchema:
        - AttributeName: transactionId
          KeyType: HASH
      GlobalSecondaryIndexes:
        - IndexName: AccountTransactions
          KeySchema:
            - AttributeName: accountId
              KeyType: HASH
            - AttributeName: createdAt
              KeyType: RANGE
          Projection:
            ProjectionType: ALL
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true

  # SNS Topic for Transaction Events
  TransactionsTopic:
    Type: AWS::SNS::Topic
    Properties:
      TopicName: "banking-transactions-dev"
      DisplayName: Banking Transactions Event Bus

  # Lambda Functions
  ProcessTransactionFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: "process-transaction-dev"
      Runtime: nodejs16.x
      Handler: processTransaction.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        S3Bucket: !Ref DeploymentBucket
        S3Key: lambda/banking-api.zip
      Environment:
        Variables:
          TRANSACTIONS_TABLE: !Ref TransactionsTable
          TRANSACTION_TOPIC_ARN: !Ref TransactionsTopic
          ENVIRONMENT: !Ref Environment
      Timeout: 30
      MemorySize: 256

  # API Gateway
  BankingAPI:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: "banking-api-dev"
      Description: API for banking transactions
      EndpointConfiguration:
        Types:
          - REGIONAL

  # API Resources and Methods
  TransactionsResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref BankingAPI
      ParentId: !GetAtt BankingAPI.RootResourceId
      PathPart: transactions

  TransactionsMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref BankingAPI
      ResourceId: !Ref TransactionsResource
      HttpMethod: POST
      AuthorizationType: NONE  # In production, use AWS_IAM or a Custom Authorizer
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:process-transaction-dev/invocations" # This would use !Sub in real CloudFormation

  # Deployment and Stage
  ApiDeployment:
    Type: AWS::ApiGateway::Deployment
    DependsOn:
      - TransactionsMethod
    Properties:
      RestApiId: !Ref BankingAPI
      Description: Initial deployment

  ApiStage:
    Type: AWS::ApiGateway::Stage
    Properties:
      RestApiId: !Ref BankingAPI
      DeploymentId: !Ref ApiDeployment
      StageName: !Ref Environment
      MethodSettings:
        - ResourcePath: '/*'
          HttpMethod: '*'
          MetricsEnabled: true
          DataTraceEnabled: true
          LoggingLevel: INFO

  # IAM Role for Lambda
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: "banking-lambda-role-dev" # This would use !Sub in real CloudFormation
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
      Policies:
        - PolicyName: BankingLambdaPolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                  - dynamodb:GetItem
                  - dynamodb:UpdateItem
                  - dynamodb:Query
                Resource: !GetAtt TransactionsTable.Arn
              - Effect: Allow
                Action:
                  - sns:Publish
                Resource: !Ref TransactionsTopic

Outputs:
  ApiEndpoint:
    Description: API Gateway endpoint URL
    Value: "https://abcdef123.execute-api.us-east-1.amazonaws.com/dev" # This would use !Sub in real CloudFormation
  TransactionsTableName:
    Description: DynamoDB Transactions table name
    Value: !Ref TransactionsTable
  TransactionsTopicArn:
    Description: SNS Topic ARN for transaction events
    Value: !Ref TransactionsTopic`
    }
  ],

  // API Design Best Practices
  "api-testing": [
    {
      title: "RESTful API Resource Controller",
      description: "This example demonstrates how to implement a RESTful API resource controller with proper status codes, error handling, and documentation.",
      language: "typescript",
      filePath: "src/controllers/product-controller.ts",
      code: `import { Request, Response } from 'express';
import { ProductService } from '../services/product-service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product-dto';
import { logger } from '../utils/logger';
import { ApiError } from '../errors/api-error';

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */
export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Get all products
   *     tags: [Products]
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Maximum number of products to return
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *         description: Number of products to skip
   *     responses:
   *       200:
   *         description: List of products
   *       500:
   *         description: Server error
   */
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const products = await this.productService.findAll(limit, offset);
      const total = await this.productService.count();
      
      res.status(200).json({
        data: products,
        meta: {
          total,
          limit,
          offset
        }
      });
    } catch (error) {
      logger.error('Error getting all products', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: Get a product by id
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Product ID
   *     responses:
   *       200:
   *         description: Product details
   *       404:
   *         description: Product not found
   *       500:
   *         description: Server error
   */
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const product = await this.productService.findById(id);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      res.status(200).json({ data: product });
    } catch (error) {
      logger.error(\`Error getting product \${req.params.id}\`, error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Create a new product
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProductDto'
   *     responses:
   *       201:
   *         description: Product created successfully
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Server error
   */
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productDto: CreateProductDto = req.body;
      const newProduct = await this.productService.create(productDto);
      
      res.status(201).json({
        data: newProduct,
        message: 'Product created successfully'
      });
    } catch (error) {
      logger.error('Error creating product', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     summary: Update a product
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Product ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProductDto'
   *     responses:
   *       200:
   *         description: Product updated successfully
   *       400:
   *         description: Invalid input
   *       404:
   *         description: Product not found
   *       500:
   *         description: Server error
   */
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const productDto: UpdateProductDto = req.body;
      
      const existingProduct = await this.productService.findById(id);
      if (!existingProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      const updatedProduct = await this.productService.update(id, productDto);
      
      res.status(200).json({
        data: updatedProduct,
        message: 'Product updated successfully'
      });
    } catch (error) {
      logger.error(\`Error updating product \${req.params.id}\`, error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     summary: Delete a product
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Product ID
   *     responses:
   *       204:
   *         description: Product deleted successfully
   *       404:
   *         description: Product not found
   *       500:
   *         description: Server error
   */
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      
      const existingProduct = await this.productService.findById(id);
      if (!existingProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      await this.productService.delete(id);
      
      // Return 204 No Content on successful deletion
      res.status(204).send();
    } catch (error) {
      logger.error(\`Error deleting product \${req.params.id}\`, error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}`
    },
    {
      title: "API Rate Limiting Middleware",
      description: "This example shows how to implement API rate limiting middleware for Express.js applications.",
      language: "typescript",
      filePath: "src/middleware/rate-limiter.ts",
      code: `import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { logger } from '../utils/logger';

// Environment variables
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '60'); // in seconds
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100'); // max requests per window

// Create Redis client
const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  enableOfflineQueue: false,
});

// Rate limiter options
const rateLimiterOptions = {
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: RATE_LIMIT_MAX, // Number of points
  duration: RATE_LIMIT_WINDOW, // Per X seconds
};

// Create rate limiter instance
const rateLimiter = new RateLimiterRedis(rateLimiterOptions);

/**
 * Rate limiter middleware function
 * 
 * This middleware implements rate limiting based on IP address
 * It can be customized to use other identifiers (user ID, API key, etc.)
 */
export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get IP address or other identifier
    // For production, use a more reliable approach to get the client IP
    const identifier = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    
    // Consume points
    const rateLimiterRes = await rateLimiter.consume(identifier);
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX);
    res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
    res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
    
    // Continue to the next middleware
    next();
  } catch (error) {
    // If rate limit is exceeded
    if (error.remainingPoints !== undefined) {
      logger.warn(\`Rate limit exceeded for IP: \${req.ip}\`);
      
      // Set headers even for rejected requests
      res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + error.msBeforeNext).toISOString());
      res.setHeader('Retry-After', Math.ceil(error.msBeforeNext / 1000));
      
      // Return 429 Too Many Requests
      res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
      });
    } else {
      // For other errors
      logger.error('Rate limiter error:', error);
      
      // Continue to the next middleware despite the error
      // This ensures API availability even if rate limiting fails
      next();
    }
  }
};

/**
 * Higher-order function to create customized rate limiters
 * 
 * @param prefix - Key prefix for different rate limiter instances
 * @param points - Number of points (requests)
 * @param duration - Duration in seconds
 */
export const createRateLimiter = (
  prefix: string,
  points: number,
  duration: number
) => {
  const customRateLimiter = new RateLimiterRedis({
    ...rateLimiterOptions,
    keyPrefix: prefix,
    points,
    duration,
  });

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const identifier = req.ip || req.headers['x-forwarded-for'] || 'unknown';
      const rateLimiterRes = await customRateLimiter.consume(identifier);
      
      res.setHeader('X-RateLimit-Limit', points);
      res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
      
      next();
    } catch (error) {
      if (error.remainingPoints !== undefined) {
        res.setHeader('X-RateLimit-Limit', points);
        res.setHeader('X-RateLimit-Remaining', 0);
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + error.msBeforeNext).toISOString());
        res.setHeader('Retry-After', Math.ceil(error.msBeforeNext / 1000));
        
        res.status(429).json({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
        });
      } else {
        logger.error('Custom rate limiter error:', error);
        next();
      }
    }
  };
};`
    }
  ],

  // Microservices Architecture
  "container-architecture": [
    {
      title: "Service Communication with gRPC",
      description: "This example demonstrates how to implement service-to-service communication using gRPC in a microservices architecture.",
      language: "typescript",
      filePath: "src/services/grpc-client.ts",
      code: `import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../proto/generated/service';
import { UserServiceClient } from '../proto/generated/UserService';
import { logger } from '../utils/logger';
import { config } from '../config';

// Path to the proto file
const PROTO_PATH = __dirname + '/../proto/user.proto';

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the package definition
const proto = (grpc.loadPackageDefinition(
  packageDefinition
) as unknown) as ProtoGrpcType;

/**
 * User service gRPC client
 * This client connects to the User Service microservice
 */
export class UserServiceGrpcClient {
  private client: UserServiceClient;
  private isConnected: boolean = false;

  constructor() {
    // Create the client
    this.client = new proto.UserService(
      \`\${config.userService.host}:\${config.userService.port}\`,
      config.userService.secure ? grpc.credentials.createSsl() : grpc.credentials.createInsecure()
    );
    
    // Set up connection timeout
    this.connectWithTimeout();
  }

  /**
   * Connect to the service with a timeout
   */
  private connectWithTimeout(timeout: number = 5000): void {
    const deadline = new Date();
    deadline.setMilliseconds(deadline.getMilliseconds() + timeout);

    this.client.waitForReady(deadline, (error) => {
      if (error) {
        logger.error('Failed to connect to User Service', error);
        this.isConnected = false;
      } else {
        logger.info('Connected to User Service');
        this.isConnected = true;
      }
    });
  }

  /**
   * Get user by ID
   * @param userId - The user ID
   */
  async getUserById(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected to User Service'));
        return;
      }

      this.client.GetUser(
        { user_id: userId },
        (error, response) => {
          if (error) {
            logger.error(\`Error getting user \${userId}\`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Get multiple users by their IDs
   * @param userIds - Array of user IDs
   */
  async getUsersByIds(userIds: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected to User Service'));
        return;
      }

      this.client.GetUsers(
        { user_ids: userIds },
        (error, response) => {
          if (error) {
            logger.error('Error getting multiple users', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Create a new user
   * @param userData - User data object
   */
  async createUser(userData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected to User Service'));
        return;
      }

      this.client.CreateUser(
        {
          username: userData.username,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName
        },
        (error, response) => {
          if (error) {
            logger.error('Error creating user', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Update an existing user
   * @param userId - The user ID
   * @param userData - User data to update
   */
  async updateUser(
    userId: string,
    userData: {
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected to User Service'));
        return;
      }

      this.client.UpdateUser(
        {
          user_id: userId,
          username: userData.username,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName
        },
        (error, response) => {
          if (error) {
            logger.error(\`Error updating user \${userId}\`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Delete a user
   * @param userId - The user ID
   */
  async deleteUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected to User Service'));
        return;
      }

      this.client.DeleteUser(
        { user_id: userId },
        (error, response) => {
          if (error) {
            logger.error(\`Error deleting user \${userId}\`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Close the client connection
   */
  close(): void {
    this.client.close();
    this.isConnected = false;
    logger.info('Disconnected from User Service');
  }
}`
    },
    {
      title: "Event-Driven Microservices with Kafka",
      description: "This example shows how to implement event-driven architecture using Kafka for inter-service communication.",
      language: "typescript",
      filePath: "src/messaging/kafka-producer.ts",
      code: `import { Kafka, Producer, Message, CompressionTypes } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
import { config } from '../config';

/**
 * Kafka message producer
 * This class handles publishing events to Kafka topics
 */
export class KafkaProducer {
  private kafka: Kafka;
  private producer: Producer;
  private isConnected: boolean = false;
  private retryCount: number = 0;
  private readonly maxRetries = 5;

  constructor() {
    // Initialize Kafka client
    this.kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: config.kafka.brokers,
      ssl: config.kafka.ssl,
      sasl: config.kafka.sasl ? {
        mechanism: 'plain',
        username: config.kafka.sasl.username,
        password: config.kafka.sasl.password
      } : undefined
    });

    // Create producer instance
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000
    });

    // Set up event handlers
    this.setupEventHandlers();
  }

  /**
   * Set up event handlers for producer events
   */
  private setupEventHandlers(): void {
    this.producer.on('producer.connect', () => {
      logger.info('Kafka producer connected');
      this.isConnected = true;
      this.retryCount = 0;
    });

    this.producer.on('producer.disconnect', () => {
      logger.warn('Kafka producer disconnected');
      this.isConnected = false;
      this.reconnect();
    });

    this.producer.on('producer.network.request_timeout', (payload) => {
      logger.error('Kafka request timeout:', payload);
    });

    process.on('SIGTERM', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  /**
   * Connect to Kafka
   */
  async connect(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      logger.error('Failed to connect to Kafka:', error);
      this.reconnect();
    }
  }

  /**
   * Reconnect to Kafka with exponential backoff
   */
  private reconnect(): void {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      const delay = Math.min(1000 * 2 ** this.retryCount, 30000);
      
      logger.info(\`Reconnecting to Kafka in \${delay}ms (attempt \${this.retryCount}/\${this.maxRetries})\`);
      
      setTimeout(async () => {
        try {
          await this.connect();
        } catch (error) {
          logger.error('Reconnection failed:', error);
        }
      }, delay);
    } else {
      logger.error('Max reconnection attempts reached. Giving up.');
    }
  }

  /**
   * Publish a message to a topic
   * 
   * @param topic - Kafka topic
   * @param message - Message payload
   * @param key - Optional message key
   * @param headers - Optional message headers
   */
  async publishMessage(
    topic: string,
    message: any,
    key?: string,
    headers?: Record<string, string>
  ): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka producer not connected');
    }

    try {
      // Prepare message
      const kafkaMessage: Message = {
        key: key || uuidv4(),
        value: JSON.stringify(message),
        headers: headers ? Object.entries(headers).reduce((acc, [key, value]) => {
          acc[key] = value ? Buffer.from(value) : null;
          return acc;
        }, {} as Record<string, Buffer | null>) : undefined,
        timestamp: Date.now().toString()
      };

      // Send message
      await this.producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: [kafkaMessage]
      });

      logger.debug(\`Message published to topic \${topic}\`, { messageKey: kafkaMessage.key });
    } catch (error) {
      logger.error(\`Failed to publish message to topic \${topic}\`, error);
      throw error;
    }
  }

  /**
   * Publish multiple messages to a topic
   * 
   * @param topic - Kafka topic
   * @param messages - Array of message objects with payload, key, and headers
   */
  async publishBatch(
    topic: string,
    messages: Array<{
      payload: any;
      key?: string;
      headers?: Record<string, string>;
    }>
  ): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka producer not connected');
    }

    try {
      // Prepare messages
      const kafkaMessages: Message[] = messages.map(msg => ({
        key: msg.key || uuidv4(),
        value: JSON.stringify(msg.payload),
        headers: msg.headers ? Object.entries(msg.headers).reduce((acc, [key, value]) => {
          acc[key] = value ? Buffer.from(value) : null;
          return acc;
        }, {} as Record<string, Buffer | null>) : undefined,
        timestamp: Date.now().toString()
      }));

      // Send messages
      await this.producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: kafkaMessages
      });

      logger.debug(\`Batch of \${messages.length} messages published to topic \${topic}\`);
    } catch (error) {
      logger.error(\`Failed to publish batch to topic \${topic}\`, error);
      throw error;
    }
  }

  /**
   * Publish transaction (atomic) messages across multiple topics
   * 
   * @param topicMessages - Map of topics to messages
   */
  async publishTransaction(
    topicMessages: Map<string, Array<{
      payload: any;
      key?: string;
      headers?: Record<string, string>;
    }>>
  ): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka producer not connected');
    }

    const transaction = await this.producer.transaction();

    try {
      // Process each topic's messages
      for (const [topic, messages] of topicMessages.entries()) {
        const kafkaMessages: Message[] = messages.map(msg => ({
          key: msg.key || uuidv4(),
          value: JSON.stringify(msg.payload),
          headers: msg.headers ? Object.entries(msg.headers).reduce((acc, [key, value]) => {
            acc[key] = value ? Buffer.from(value) : null;
            return acc;
          }, {} as Record<string, Buffer | null>) : undefined,
          timestamp: Date.now().toString()
        }));

        await transaction.send({
          topic,
          compression: CompressionTypes.GZIP,
          messages: kafkaMessages
        });
      }

      // Commit transaction
      await transaction.commit();
      logger.debug('Transaction committed successfully');
    } catch (error) {
      // Abort transaction on error
      await transaction.abort();
      logger.error('Transaction aborted due to error:', error);
      throw error;
    }
  }

  /**
   * Disconnect the producer
   */
  async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      this.isConnected = false;
      logger.info('Kafka producer disconnected');
    } catch (error) {
      logger.error('Error disconnecting Kafka producer:', error);
    }
  }
}`
    }
  ]
}; 