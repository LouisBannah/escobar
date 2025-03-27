export interface ContentBlock {
  type: 'paragraph' | 'header' | 'bullet_list' | 'numbered_list' | 'sub_bullet';
  content?: string;
  items?: {
    content: string;
    sub_bullets?: string[];
  }[];
}

export interface DetailedDescription {
  id: string;
  blocks: ContentBlock[];
}

export const detailedDescriptions: DetailedDescription[] = [
  {
    id: 'credentials-deck',
    blocks: [
      {
        type: 'paragraph',
        content: 'Banking transformation success stories serve as powerful proof points that build client confidence and demonstrate implementation expertise. Our Credential References toolkit delivers a curated collection of these success narratives, meticulously documented and organized to support sales engagements across different banking segments and transformation themes.'
      },
      {
        type: 'header',
        content: 'Each credential includes:'
      },
      {
        type: 'bullet_list',
        items: [
          { content: 'Detailed problem statements aligned to common banking challenges' },
          { content: 'Solution architecture and implementation approach' },
          { content: 'Measurable outcomes with quantified business impact' },
          { content: 'Client testimonials and executive endorsements' }
        ]
      },
      {
        type: 'header',
        content: 'Success Measurement Categories:'
      },
      {
        type: 'numbered_list',
        items: [
          {
            content: 'Operational Efficiency',
            sub_bullets: [
              'Cost reduction percentages',
              'Process automation metrics',
              'Staff productivity improvements'
            ]
          },
          {
            content: 'Customer Experience',
            sub_bullets: [
              'NPS/CSAT improvement data',
              'Digital adoption statistics',
              'Channel migration metrics'
            ]
          },
          {
            content: 'Revenue Impact',
            sub_bullets: [
              'Cross-sell/up-sell increases',
              'Customer acquisition improvements',
              'New revenue stream contributions'
            ]
          }
        ]
      },
      {
        type: 'paragraph',
        content: 'The toolkit features interactive filtering capabilities, allowing teams to rapidly identify the most relevant success stories based on client profile, geographic region, or specific transformation objectives. Updated quarterly, this living repository ensures our references remain current and compelling, reflecting our continuous innovation and implementation excellence in the banking sector.'
      }
    ]
  },
  {
    id: 'future-ready-pov',
    blocks: [
      {
        type: 'paragraph',
        content: 'The banking industry stands at an inflection point, facing unprecedented disruption from fintech innovators, evolving customer expectations, and regulatory pressures. Our Future-Ready Bank Point of View provides a comprehensive strategic framework for navigating this complex transformation landscape, offering both vision and pragmatic implementation guidance.'
      },
      {
        type: 'header',
        content: 'Transformation Pillars:'
      },
      {
        type: 'bullet_list',
        items: [
          { content: 'Customer centricity and experience design' },
          { content: 'Operational resilience and efficiency' },
          { content: 'Technology modernization and innovation' },
          { content: 'Regulatory compliance and risk management' }
        ]
      },
      {
        type: 'header',
        content: 'Digital Enablement Framework:'
      },
      {
        type: 'numbered_list',
        items: [
          {
            content: 'Foundation Layer',
            sub_bullets: [
              'Cloud-native architecture',
              'API-first approach',
              'Data mesh implementation',
              'DevSecOps practices'
            ]
          },
          {
            content: 'Experience Layer',
            sub_bullets: [
              'Omnichannel orchestration',
              'Personalization engines',
              'AI-powered engagement',
              'Embedded finance capabilities'
            ]
          }
        ]
      },
      {
        type: 'paragraph',
        content: 'The POV analyzes market trends through primary research conducted across 250+ banking executives globally, providing benchmarking data and maturity models for comparative assessment. It outlines tangible transition pathways from current state to future vision through modular transformation approaches, enabling banks to sequence change initiatives for maximum impact while managing implementation risk.'
      }
    ]
  },
  {
    id: 'ecb-compliance',
    blocks: [
      {
        type: 'paragraph',
        content: 'European Central Bank regulatory guidelines represent a complex tapestry of requirements that financial institutions must navigate when adopting cloud technologies. Our ECB Cloud Compliance framework transforms these intricate mandates into a structured implementation roadmap, enabling banks to harness cloud innovation while maintaining regulatory conformity.'
      },
      {
        type: 'header',
        content: 'Regulatory Landscape Assessment:'
      },
      {
        type: 'bullet_list',
        items: [
          { content: 'ECB cloud outsourcing guidelines' },
          { content: 'National competent authority requirements' },
          { content: 'DORA implementation considerations' },
          { content: 'Cross-border data sovereignty laws' }
        ]
      },
      {
        type: 'header',
        content: 'Architectural Components:'
      },
      {
        type: 'numbered_list',
        items: [
          {
            content: 'Multi-Region Infrastructure',
            sub_bullets: [
              'Data residency controls',
              'Geographic redundancy patterns',
              'Compliance-aware deployment models',
              'Cross-border data transfer mechanisms'
            ]
          },
          {
            content: 'Security Control Framework',
            sub_bullets: [
              'Identity and access governance',
              'Encryption and key management',
              'Security monitoring architecture',
              'Incident response protocols'
            ]
          }
        ]
      },
      {
        type: 'paragraph',
        content: 'The framework includes comprehensive assessment tools for measuring current compliance maturity, identifying gaps, and prioritizing remediation efforts. Implementation templates provide standardized approaches to governance structures, risk assessment methodologies, and audit processes.'
      }
    ]
  }
]; 