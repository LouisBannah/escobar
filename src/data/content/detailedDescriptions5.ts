import { DetailedDescription } from './detailedDescriptions';

export const detailedDescriptions5: DetailedDescription[] = [
  {
    id: 'api-testing',
    blocks: [
      {
        type: 'paragraph',
        content: 'API-driven architectures form the foundation of modern banking platforms, requiring comprehensive testing approaches that validate both functional correctness and non-functional characteristics. Our API Testing Framework provides a structured methodology for designing, implementing, and automating API quality assurance across development and operational environments.'
      },
      {
        type: 'paragraph',
        content: 'The framework establishes API contracts as the primary interface definition, enabling parallel development and clear service boundaries. It addresses banking-specific requirements including security validation, performance characteristics, and compliance considerations.'
      },
      {
        type: 'header',
        content: 'Testing Approach Components:'
      },
      {
        type: 'bullet_list',
        items: [
          { content: 'Contract-driven test design' },
          { content: 'Service virtualization strategy' },
          { content: 'End-to-end scenario validation' },
          { content: 'Non-functional requirement verification' }
        ]
      },
      {
        type: 'header',
        content: 'Implementation Architecture:'
      },
      {
        type: 'numbered_list',
        items: [
          {
            content: 'Functional Validation',
            sub_bullets: [
              'Positive and negative test patterns',
              'Data variation coverage',
              'Boundary condition testing',
              'Integration scenario verification'
            ]
          },
          {
            content: 'Non-functional Assessment',
            sub_bullets: [
              'Security testing approach',
              'Performance benchmark methodology',
              'Reliability validation techniques',
              'Compliance verification patterns'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'enterprise-integration',
    blocks: [
      {
        type: 'paragraph',
        content: 'Banking ecosystems require sophisticated integration approaches to connect diverse systems while maintaining transaction integrity, security, and performance. Our Enterprise Integration Patterns framework provides a comprehensive catalog of proven design solutions for implementing reliable, scalable connections across banking applications.'
      },
      {
        type: 'paragraph',
        content: 'The framework establishes integration as a strategic capability rather than tactical connections, providing patterns that address both technical implementation and architectural governance. It focuses on banking-specific concerns including transaction consistency, audit requirements, and regulatory considerations.'
      },
      {
        type: 'header',
        content: 'Pattern Categories:'
      },
      {
        type: 'bullet_list',
        items: [
          { content: 'Messaging exchange patterns' },
          { content: 'Routing and transformation approaches' },
          { content: 'Transaction management techniques' },
          { content: 'System connection topologies' }
        ]
      },
      {
        type: 'header',
        content: 'Implementation Domains:'
      },
      {
        type: 'numbered_list',
        items: [
          {
            content: 'Synchronous Integration',
            sub_bullets: [
              'API gateway implementation',
              'Service orchestration patterns',
              'Request-response handling',
              'Error management approaches'
            ]
          },
          {
            content: 'Asynchronous Communication',
            sub_bullets: [
              'Event streaming architecture',
              'Message queue implementation',
              'Pub/sub pattern application',
              'Dead letter handling strategies'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'risk-scoring',
    blocks: [
      {
        type: 'paragraph',
        content: 'Effective risk management in banking requires sophisticated approaches to quantifying, assessing, and monitoring diverse risk factors. Our Risk Scoring Methodology provides a comprehensive framework for developing and implementing risk assessment models across credit, fraud, compliance, and operational domains.'
      },
      {
        type: 'paragraph',
        content: 'The methodology balances statistical rigor with practical implementation considerations, creating scoring approaches that offer both predictive power and explainability. It addresses regulatory requirements for model governance while enabling business-driven risk management strategies.'
      },
      {
        type: 'header',
        content: 'Scoring Framework Components:'
      },
      {
        type: 'bullet_list',
        items: [
          { content: 'Factor identification and selection' },
          { content: 'Weighting methodology options' },
          { content: 'Calibration and validation techniques' },
          { content: 'Implementation architecture patterns' }
        ]
      },
      {
        type: 'header',
        content: 'Development Approach:'
      },
      {
        type: 'numbered_list',
        items: [
          {
            content: 'Model Design',
            sub_bullets: [
              'Data exploration techniques',
              'Feature engineering methods',
              'Algorithm selection criteria',
              'Performance metric definition'
            ]
          },
          {
            content: 'Implementation Strategy',
            sub_bullets: [
              'Scoring engine architecture',
              'Decision threshold management',
              'Override mechanism design',
              'Monitoring approach implementation'
            ]
          }
        ]
      }
    ]
  }
]; 