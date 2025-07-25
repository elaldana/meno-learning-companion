# Product Requirements Document: Meno Learning Companion MVP

## Executive Summary

Meno Learning Companion MVP is a web application that provides an AI-powered chat interface where developers can solve technical problems and capture their learnings to share with their team. Named after Plato's Meno dialogue about learning through questioning, it transforms individual problem-solving sessions into shareable team knowledge by adding just 45 seconds to capture and reflect on solutions.

## Problem Statement

**Current State**: People use AI to solve problems in isolation. Knowledge gained dies in private chat sessions. Teams and communities repeatedly solve identical issues.

**Concrete Impact**: 
- Teams waste 15+ hours/week on previously-solved problems
- Experienced professionals can't transfer knowledge efficiently  
- Newcomers lack access to collective knowledge
- Organizations and communities lose competitive advantage as expertise doesn't compound

## Vision

Create a simple tool that makes capturing and sharing AI-assisted problem solutions as easy as clicking a button.

## Learning Principles

- **Reflection**: Immediate capture promotes metacognition by requiring users to pause and think about what they just learned
- **Generation Effect**: Users articulate solutions in their own words, which improves retention compared to passive consumption
- **Spaced Repetition**: History view enables periodic review of past learnings, reinforcing knowledge over time
- **Social Learning**: Sharing creates teaching opportunities where explaining to others deepens one's own understanding
- **Confidence Calibration**: Self-assessment improves learning awareness and helps identify knowledge gaps

## MVP Scope

### In Scope
- **Proactive learning detection with intelligent suggestions**
- Manual capture trigger (floating button)
- **Enhanced 3-question form with AI assistance (Meno Assist)**
- **AI-powered Socratic follow-up question with response guidance**
- **AI-generated key learning with validation**
- **Self-reflection confidence rating (Still Learning/Somewhat Confident/Very Confident)**
- Local browser storage
- Copy-to-clipboard sharing
- **Advanced Insight Library with dual filtering and detailed views**
- **Comprehensive insight detail modal with conversation history**

### Out of Scope (Future)
- Automatic problem/solution detection
- Cloud storage and team sync
- Slack/Teams integrations
- Analytics and insights
- Search and discovery

## User Personas

**Primary: Sarah the Knowledge Worker**
- Uses Claude 10+ times/day for various tasks (research, writing, analysis)
- Wants to help teammates but lacks time to document
- Needs frictionless knowledge capture

**Secondary: Tom the Learning Enthusiast**
- Often solves problems others have faced
- Wants to contribute to community knowledge
- Needs simple way to share learnings

## Core User Flow

### 1. Problem Solving (Normal Claude Usage)
User works with Claude-powered application to solve a problem as they normally would, as if they were using Claude.ai.

### 2. Learning Capture Trigger
- **Proactive Detection**: Meno automatically detects learning opportunities and suggests capture
- **Intelligent Timing**: Suggestions appear after problem-solving conversations, not during active problem-solving
- **Social Motivation**: Suggestions include social context about how the learning could help others
- **Manual Trigger**: User can also click floating "💡 Capture Learning" button
- Application automatically analyzes the conversation context

### 3. Quick Capture Form
Simple modal appears with audience selection:

```
"I'll help track this problem and solution. Who might face this same problem?"

👥 My Team
🔮 Future me  
🆕 New hires

[Select one or more]
```

Modal then presents three questions with AI assistance:

```
What was the problem?
[Text input with 🤖 Meno Assist button]

What was its cause?
[Text input with 🤖 Meno Assist button]

What was the solution?
[Text area with 🤖 Meno Assist button]

[Generate Card] [Cancel]
```

**Meno Assist Feature**: Each form field includes an AI-powered assistance button that provides:
- Contextual questions to help users think deeper
- Writing tips for better articulation
- Example templates based on the conversation
- Guidance without giving direct answers

### 4. AI-Enhanced Learning
Claude API performs comprehensive analysis:

**A) Summary Assessment:**
- Analyzes full conversation context
- Evaluates user's summary against chat content
- Determines if reflection demonstrates understanding

**B) Contextual Socratic Question:**
```
Based on your discussion about [specific topic], here's a deeper question:
"[Contextual question that promotes interaction and learning]"

[User's response with 🤖 Meno Assist button - encouraged to deepen understanding]
```

**Socratic Response Assistance**: Users can click "🤖 Meno Assist" to get guidance on how to respond to the audience question, including:
- Questions about what their audience really wants to know
- Tips for educational responses that help others learn
- Example response structures and analogies

**C) Key Learning Generation:**
```
From your conversation, the key principle seems to be:
"[AI-generated insight aligned with conversation flow]"

Does this capture the main takeaway?
[✓ Yes, exactly] [✗ Let me revise]
```

**D) Alignment Feedback:**
- Shows how well user's summary aligns with the conversation
- Provides suggestions if key aspects were missed
- Offers to refine the capture

**E) Confidence Assessment:**
```
How confident are you in your understanding?
[😕 Still learning] [🤔 Somewhat confident] [😊 Very confident]
```

### 5. Enhanced Insight Card Generation
Creates formatted learning card with:
- Problem, cause, and solution summary
- Selected audience context (Team/Future me/New hires)
- Key learning principle
- Contextual insights from conversation
- Understanding level indicator
- Timestamp and author

Example card:
```
💡 Learning Insight - For: My Team & Future me

**Problem:** Excel formulas not updating automatically
**Cause:** Calculation mode was set to manual
**Solution:** Changed to automatic via Formulas > Calculation Options

**Key Learning:** Always check calculation settings when Excel formulas seem broken

**Context:** Discovered while building financial model - affects all workbooks on the computer, not just current file

📊 Confidence: 😊 Very confident

- Sarah Chen | Nov 15, 2024
```

### 6. Store and Share Insight Card
- **Copy to Clipboard**: One-click sharing to Slack/Teams/Email
- **Insight Library**: 
  - Cards stored chronologically with enhanced information display
  - **Dual Filtering System**: Filter by audience (Team/Future Me/New Hires) AND confidence level (Still Learning/Somewhat Confident/Very Confident)
  - **Enhanced Cards**: Display problem, cause, solution, key learning, confidence level, and date
  - **Detailed View**: Click any card to see full insight details including conversation history
  - **Quick Actions**: Copy, delete, or view detailed insights from library
  - **Filter Summary**: Visual display of active filters with easy clear option
- **Insight Detail Modal**: Comprehensive view showing full problem, solution, conversation context, and learning journey

## Enhanced Features

### Proactive Learning Detection
**Purpose**: Automatically identify and suggest learning capture opportunities
**Features**:
- **Intelligent Pattern Recognition**: Detects problem-solving, debugging, concept explanations, and best practices
- **Social Context Generation**: Provides personalized reasons why the learning would benefit others
- **Smart Timing**: Suggests capture after problem resolution, not during active problem-solving
- **Confidence Scoring**: Uses multiple indicators to assess learning opportunity quality
- **Rate Limiting**: Prevents suggestion spam with intelligent cooldown periods
- **Non-Intrusive Design**: Suggestions appear as beautiful, dismissible cards in the chat flow

**Learning Detection Patterns**:
- **Problem Solved**: "solved", "fixed", "working now", "figured out"
- **Debugging Success**: Error identification → resolution sequences
- **Concept Explained**: "explain", "how does", "what is", "understand"
- **Best Practice**: "best practice", "better way", "should use", "recommended"
- **Troubleshooting**: Step-by-step problem resolution processes

**Social Context Examples**:
- "Your teammates might encounter this same issue"
- "This solution could help others on your team"
- "This debugging approach could save your team time"
- "This explanation would be perfect for onboarding new team members"

### Meno Assist - AI-Powered Form Assistance
**Purpose**: Help users write better problem, cause, and solution descriptions
**Features**:
- **Contextual Guidance**: AI analyzes conversation to provide relevant suggestions
- **Scaffolding Approach**: Questions and tips help users think deeper without giving direct answers
- **Field-Specific Prompts**: Different assistance for problem identification, root cause analysis, and solution documentation
- **Socratic Response Guidance**: Special assistance for responding to audience questions
- **Fallback Support**: Local suggestions when AI is unavailable

### Advanced Insight Library
**Purpose**: Enhanced organization and discovery of captured learnings
**Features**:
- **Dual Filtering System**: Filter by both audience type and confidence level simultaneously
- **Enhanced Card Display**: Shows problem, cause, solution, key learning, confidence, and date
- **Detailed View Modal**: Comprehensive insight view with full conversation history
- **Filter Summary**: Visual display of active filters with one-click clear option
- **Responsive Design**: Clean, modern interface that works on all devices

### Confidence-Based Learning
**Purpose**: Help users track and improve their understanding over time
**Features**:
- **Three Confidence Levels**: Still Learning, Somewhat Confident, Very Confident
- **Learning Progression**: Track how confidence changes over time
- **Filtered Views**: Find insights by confidence level for targeted review
- **Self-Assessment**: Encourages metacognitive awareness of knowledge gaps

## Example Learning Scenarios

### Scenario 1: Student Masters Research Methodology
**Context**: Maya (graduate student) struggles with literature review methodology.

**AI Interaction**: Claude helps Maya develop a systematic approach to finding, evaluating, and synthesizing academic sources.

**Capture Process**:
- **Issue**: "Can't organize 50+ papers for lit review"
- **Investigation**: "Tried folders by date, got confused about themes"
- **Solution**: "Created matrix: themes vs. methodologies, tagged papers with both"

**Socratic Follow-up**: "How might this approach work for other types of information organization?"
- Maya's response: "Could use for organizing class notes or project resources too"

**Key Learning Generated**: "Use multi-dimensional tagging (theme + method) instead of folders for complex information"

**Community Impact**: When shared in study group, classmates adopt the matrix approach for their own research.

### Scenario 2: Marketing Team Discovers Content Pattern
**Context**: Multiple team members capture learnings about social media engagement over two weeks.

**Pattern Emerges**:
- 3 captures about video content performing better
- 2 captures about optimal posting times
- All initially rated "🤔 Somewhat confident"

**Learning Evolution**:
- Team realizes engagement follows predictable patterns
- Creates shared insight: "Video + morning posts = 3x engagement"
- Future captures show increasing confidence
- New team practice: A/B test all content formats

### Scenario 3: Designer Accesses Creative Problem-Solving Technique
**Context**: Alex (new designer) stuck on logo iterations feeling "all the same."

**Searches History**: Finds Jordan's capture from last month:
- **Issue**: "Logo designs feeling stale and repetitive"
- **Investigation**: "Kept refining same concept, minor tweaks only"
- **Solution**: "Used 'opposite day' technique - designed the worst possible logo first, then inverted those choices"
- **Key Learning**: "When stuck creatively, design the opposite first to break mental patterns"

**Impact**: 
- Alex breaks through creative block in 30 minutes
- Adds follow-up: "Also tried with color palettes - worked great!"
- Shares technique in next design critique session

## MVP Features

### P0 - Core Loop
1. **Proactive Learning Detection**
   - Automatically detects learning opportunities in conversations
   - Suggests capture with social context and motivation
   - Intelligent timing and rate limiting
   - Beautiful, non-intrusive suggestion cards

2. **Floating Capture Button**
   - Always visible on Claude.ai
   - Non-intrusive positioning
   - Clear call-to-action

3. **Capture Modal**
   - Three text inputs
   - Auto-focus on first field
   - Escape to close

3. **AI Learning Enhancement**
   - **Socratic Follow-up**: AI asks one deepening question
   - **Confidence Assessment**: User self-reports understanding level
   - **Key Learning Generation**: AI extracts the principle
   - **Navigation**: Back button to edit previous answers
   - **Learning Validation**: User confirms or revises

4. **Local Storage**
   - Save captures with enhanced learnings
   - Include reflection ratings
   - Persist across sessions

5. **Enhanced Share Card**
   - Includes validated key learning
   - Shows understanding level
   - Ready for team education

6. **History View**
   - See past captures with learnings
   - Filter by confidence level
   - Copy any previous card

## Technical Requirements

### Web Application
- Single page application (index.html)
- API route for Claude integration (/api/chat.js)
- Deployed on Vercel
- Mobile responsive design

### Browser Compatibility
- Chrome/Edge/Safari/Firefox
- Mobile browsers supported

### API Integration
- Claude API via server-side proxy
- Environment variables for API keys
- Secure server-side handling

### Performance
- < 50ms to show capture form
- No impact on Claude.ai performance

## Success Metrics

### MVP Success Criteria
- **Installation**: 10 team members install and try it
- **Usage**: 5+ captures per user in first week
- **Proactive Adoption**: 60%+ of users accept learning suggestions when offered
- **Learning Enhancement**: 70%+ engage with Socratic questions
- **Reflection**: 60%+ rate understanding as "Confident"
- **Sharing**: 50% of captures get shared
- **Feedback**: 8/10 or higher "helped me understand better"

### Learning-Specific Metrics
- **Comprehension**: 80% of users can explain captured solutions without referring to notes after 24 hours
- **Transfer**: 50% of users report applying a captured learning to a new problem within one week
- **Teaching**: 30% of shared cards lead to team discussions or follow-up questions
- **Retention**: 60% of users can recall key learnings from captures after 1 week
- **Metacognition**: Users' confidence ratings correlate with actual performance (measured via follow-up quiz)

### Key Questions to Answer
1. Do people actually click capture?
2. **Do proactive suggestions increase capture rates?**
3. **What types of learning opportunities are most valuable?**
4. What types of problems get captured?
5. Where do people share (Slack vs Teams vs Wiki)?
6. What's preventing more usage?
7. Does the Socratic questioning actually deepen understanding?
8. Are the AI-generated key learnings accurate and valuable?

## Future Enhancements

### Phase 1: Intelligent Capture
- **Auto-detection**: Detect when problems are solved in chat
- **Smart pre-fill**: Extract issue/solution from conversation
- **Rich capture**: Include code snippets, error messages
- **Audience selection**: Tag captures for specific groups

### Phase 2: Team Knowledge Base
- **Cloud sync**: Share captures across team
- **Search**: Find previous solutions quickly
- **Similar problems**: "3 people solved this before"
- **Analytics**: What's your team learning?

### Phase 3: Workflow Integration
- **Slack/Teams apps**: Direct posting
- **IDE integration**: Access knowledge while coding
- **CI/CD hooks**: Suggest solutions in PR comments
- **Documentation generation**: Auto-create runbooks

### Phase 4: Intelligence Layer
- **Pattern recognition**: Identify recurring issues
- **Proactive suggestions**: "Tom might need this"
- **Learning paths**: Onboard new hires with real examples
- **Impact tracking**: Measure time saved

### Long-term Vision Features
- **Multi-AI support**: Integrate with other AI models
- **Video capture**: Record solution walkthroughs
- **Collaborative debugging**: Real-time knowledge sharing
- **Enterprise features**: SSO, admin controls, compliance
- **Mobile app**: Native iOS/Android applications

## Rollout Strategy

### Week 1: Internal Testing
- Deploy to Vercel
- 5 volunteers test the web app
- Daily feedback sessions
- Iterate on UX

### Week 2: Team Pilot
- Share URL with full team
- Slack channel for feedback
- Track usage metrics

### Week 3: Evaluation
- Survey users
- Analyze captures
- Decide on future investment

## Risks & Mitigations

**Risk**: Low usage due to manual trigger
- **Mitigation**: Make button prominent, remind in standups

**Risk**: Poor quality captures
- **Mitigation**: Show good examples, gentle prompts

**Risk**: Not enough value for effort
- **Mitigation**: Reduce to 2 questions if needed

## Design Principles

1. **Zero Friction**: Must not slow down debugging
2. **Obvious Value**: Benefits clear from first use
3. **Start Simple**: Prove concept before adding complexity
4. **User Control**: No automatic actions, user triggers all

---

# PROMPT ARCHITECTURE

## Overview

The Meno Learning Companion uses a sophisticated prompt architecture to create engaging, socially-aware learning experiences. The system employs 14 different types of prompts across AI interactions, user interfaces, fallback scenarios, form assistance features, and proactive learning detection.

## AI System Prompts

### 1. Main Chat System Prompt
**Purpose**: Defines Meno's personality and conversational approach  
**Location**: `api/chat.js` (lines 102-108)  
**Usage**: All chat interactions with users

```javascript
system: `You are Meno, an AI assistant named after the character in Plato's dialogue about learning. 
You help people solve problems through thoughtful questioning and clear explanations. 
You work with all kinds of users - students, professionals, researchers, and lifelong learners.
Be concise, helpful, and encouraging. When users solve problems, encourage them to capture their learnings.
Use the Socratic method when appropriate to deepen understanding.`
```

**Design Rationale**: 
- Establishes Meno's identity as a learning-focused assistant
- Emphasizes the Socratic method for deeper understanding
- Encourages knowledge capture behavior
- Maintains a supportive, educational tone

### 2. Analysis Prompt
**Purpose**: Generates learning enhancements and audience-specific questions  
**Location**: `api/chat.js` (lines 148-175)  
**Usage**: When users capture learning insights

```javascript
const analysisPrompt = `Based on this conversation and the user's capture, provide learning enhancements.

Conversation context:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User's capture:
- Problem: ${captureData.problem}
- Cause: ${captureData.cause}
- Solution: ${captureData.solution}
- Intended audience: ${captureData.audience}

Please provide:
1. An assessment of how well their summary captures the essence of the conversation
2. A realistic question that their actual audience would ask them about this problem/solution. Make it specific and practical:
   - For "team": What would a teammate actually ask in a code review, standup, or when they encounter this same issue?
   - For "future": What would you actually wonder when you see this solution 6 months from now?
   - For "new hires": What would a new team member actually ask when they're trying to understand this?
3. The key learning principle from this experience
4. Any suggestions if they missed important aspects

Format your response as JSON with these fields:
{
  "alignment": "assessment of their summary",
  "socraticQuestion": "a realistic question their audience would actually ask them",
  "keyLearning": "the main principle or insight",
  "suggestions": "any recommendations or missing elements"
}`;
```

**Design Rationale**:
- Provides conversation context for accurate analysis
- Generates socially-realistic questions based on audience type
- Ensures structured JSON response for reliable parsing
- Focuses on practical, actionable insights

## User Interface Prompts

### 3. Chat Input Placeholder
**Purpose**: Guides users to start conversations  
**Location**: `index.html` (line 776)  
**Usage**: Main chat interface

```html
placeholder="Ask me anything..."
```

**Design Rationale**: Simple, open-ended invitation that doesn't constrain user thinking

### 4. Socratic Response Placeholder
**Purpose**: Encourages users to respond to AI-generated questions  
**Location**: `index.html` (line 851)  
**Usage**: Learning capture workflow

```html
placeholder="How would you respond to this question? (optional)..."
```

**Design Rationale**: 
- Frames the interaction as a response to a specific question
- Makes response optional to reduce friction
- Encourages deeper thinking about the question

### 5. Key Learning Revision Placeholder
**Purpose**: Allows users to refine AI-generated insights  
**Location**: `index.html` (line 883)  
**Usage**: Learning validation step

```html
placeholder="Write your own key learning..." rows="2"
```

**Design Rationale**: Empowers users to take ownership of their learning insights

## Fallback Local Prompts

### 6. Team Questions (Fallback)
**Purpose**: Provides realistic team-focused questions when AI is unavailable  
**Location**: `index.html` (lines 1335-1340)  
**Usage**: Offline or AI failure scenarios

```javascript
questions: [
    "Wait, why did this break in the first place? What was the root cause?",
    "How do we make sure this doesn't happen again? Should we add some tests?",
    "What if this happens in production? Do we have monitoring for this?",
    "Could this affect other parts of the system? Should we check?"
]
```

**Design Rationale**: 
- Mimics real team conversations in code reviews and standups
- Focuses on practical concerns (testing, monitoring, system impact)
- Uses casual, conversational language

### 7. Future Self Questions (Fallback)
**Purpose**: Provides introspective questions for future reference  
**Location**: `index.html` (lines 1341-1346)  
**Usage**: Offline or AI failure scenarios

```javascript
questions: [
    "What was I thinking when I wrote this? Why did I choose this approach?",
    "How did I figure out this was the problem? What debugging steps did I take?",
    "What if this breaks again? Do I remember all the steps to fix it?",
    "Is there a better way to solve this now that I understand it better?"
]
```

**Design Rationale**:
- Encourages metacognitive reflection
- Focuses on decision-making processes
- Prepares for future problem-solving scenarios

### 8. New Hire Questions (Fallback)
**Purpose**: Provides onboarding-focused questions for knowledge transfer  
**Location**: `index.html` (lines 1347-1352)  
**Usage**: Offline or AI failure scenarios

```javascript
questions: [
    "I'm seeing this same error - what should I check first?",
    "What background do I need to understand this problem?",
    "Where can I find more info about this? Are there docs?",
    "How often does this happen? Is this a common issue?"
]
```

**Design Rationale**:
- Addresses common new hire concerns
- Focuses on practical troubleshooting steps
- Emphasizes knowledge discovery and documentation

## Meno Assist Prompts

### 9. Problem Identification Assist Prompt
**Purpose**: Helps users articulate the core problem they solved  
**Location**: `index.html` (lines 1820-1830)  
**Usage**: When users click "Meno Assist" for problem field

```javascript
prompt: `Based on this conversation, help the user identify the core problem they solved. 
        
Provide:
1. 2-3 specific questions to help them think about what the problem really was
2. 1-2 example problem statements they could use as a template
3. Tips for writing a clear, specific problem description

Focus on helping them articulate their own understanding, not giving them the answer.`
```

**Design Rationale**:
- Guides users to think deeper about problem definition
- Provides scaffolding without giving direct answers
- Emphasizes clarity and specificity in problem articulation

### 10. Root Cause Analysis Assist Prompt
**Purpose**: Helps users identify underlying causes of problems  
**Location**: `index.html` (lines 1831-1841)  
**Usage**: When users click "Meno Assist" for cause field

```javascript
prompt: `Based on this conversation, help the user identify the underlying cause of their problem.
        
Provide:
1. 2-3 questions to help them think about why this problem occurred
2. 1-2 example cause statements they could use as a template
3. Tips for distinguishing between symptoms and root causes

Help them think deeper about causality, not just surface-level issues.`
```

**Design Rationale**:
- Encourages deeper causal thinking
- Distinguishes between symptoms and root causes
- Provides frameworks for systematic analysis

### 11. Solution Documentation Assist Prompt
**Purpose**: Helps users document their solution effectively  
**Location**: `index.html` (lines 1842-1852)  
**Usage**: When users click "Meno Assist" for solution field

```javascript
prompt: `Based on this conversation, help the user document their solution effectively.
        
Provide:
1. 2-3 questions to help them think about what made their solution work
2. 1-2 example solution descriptions they could use as a template
3. Tips for writing actionable, reusable solution steps

Focus on helping them capture the key steps and reasoning, not just the final answer.`
```

**Design Rationale**:
- Emphasizes actionable, reusable documentation
- Focuses on process and reasoning, not just outcomes
- Helps users create templates for future problem-solving

### 12. Meno Assist API Prompt
**Purpose**: Structures AI responses for form field assistance  
**Location**: `api/chat.js` (lines 280-290)  
**Usage**: Backend processing of Meno Assist requests

```javascript
const assistPrompt = `${customPrompt}

Conversation context:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Please provide your response in this exact JSON format:
{
  "questions": ["question 1", "question 2", "question 3"],
  "tips": ["tip 1", "tip 2", "tip 3"],
  "example": "A concrete example they could use as a template"
}

Focus on helping them think through their own understanding, not providing the answer directly.`;
```

**Design Rationale**:
- Ensures consistent JSON response format for reliable parsing
- Maintains focus on guidance rather than direct answers
- Provides conversation context for relevant suggestions

### 13. Socratic Response Assist Prompt
**Purpose**: Helps users think through how to respond to audience questions  
**Location**: `index.html` (lines 1842-1852)  
**Usage**: When users click "Meno Assist" for Socratic response field

```javascript
prompt: `Based on this conversation and the Socratic question, help the user think through how they would respond to their audience's question.
        
Provide:
1. 2-3 questions to help them think about what their audience really wants to know
2. 1-2 example response structures they could use as a template
3. Tips for responding in a way that helps their audience learn and understand

Focus on helping them think about the social and educational aspects of their response, not just the technical details.`
```

**Design Rationale**:
- Enhances social learning by helping users think about audience needs
- Encourages educational responses that help others learn
- Balances technical accuracy with pedagogical effectiveness

### 14. Proactive Learning Detection System
**Purpose**: Automatically identifies learning opportunities and generates social context  
**Location**: `index.html` (lines 1720-1850)  
**Usage**: Real-time conversation analysis for learning opportunity detection

```javascript
// Learning opportunity patterns with confidence scoring
const patterns = {
    problemSolved: {
        indicators: ['solved', 'fixed', 'working now', 'figured out', 'resolved'],
        confidence: 0.8
    },
    debuggingSuccess: {
        indicators: ['error', 'debug', 'troubleshoot', 'issue', 'problem'],
        successIndicators: ['fixed', 'solved', 'working', 'resolved'],
        confidence: 0.7
    },
    conceptExplained: {
        indicators: ['explain', 'how does', 'what is', 'understand', 'learned'],
        confidence: 0.6
    },
    bestPractice: {
        indicators: ['best practice', 'better way', 'should use', 'recommended'],
        confidence: 0.8
    }
};

// Social context generation for different learning types
const socialContexts = {
    problemSolved: [
        "Your teammates might encounter this same issue",
        "This solution could help others on your team",
        "This debugging approach could save your team time"
    ],
    debuggingSuccess: [
        "This troubleshooting process would be valuable for your team",
        "Other developers might run into this same error"
    ]
};
```

**Design Rationale**:
- Uses pattern recognition to identify high-value learning moments
- Generates socially-motivating context to encourage capture
- Implements intelligent timing and rate limiting to avoid interruption
- Balances automation with user control and choice

## Prompt Design Principles

### 1. Social Realism
All prompts are designed to mimic real human interactions and conversations, making the learning experience feel natural and engaging.

### 2. Audience Awareness
Prompts adapt based on the intended audience (team, future self, new hires) to ensure relevance and usefulness.

### 3. Progressive Disclosure
Information is revealed gradually through the conversation flow, preventing cognitive overload.

### 4. Error Resilience
Fallback prompts ensure the system remains functional even when AI services are unavailable.

### 5. User Empowerment
Prompts encourage users to take ownership of their learning and validate AI-generated insights.

### 6. Practical Focus
All prompts emphasize actionable insights and real-world application rather than abstract concepts.

## Prompt Flow Architecture

```
User Input → Chat System Prompt → Claude Response
     ↓
Capture Trigger → Analysis Prompt → Enhanced Learning
     ↓
UI Prompts → User Reflection → Validation
     ↓
Fallback Prompts → Local Enhancement → Complete
```

## Future Prompt Enhancements

### Planned Improvements
1. **Contextual Awareness**: Prompts that adapt based on user's learning history
2. **Domain-Specific Prompts**: Tailored questions for different fields (engineering, design, research)
3. **Collaborative Prompts**: Questions that encourage team discussion and knowledge sharing
4. **Progressive Complexity**: Prompts that increase in sophistication as users become more experienced

### Research Areas
1. **Prompt Effectiveness**: Measuring which prompt types lead to better learning outcomes
2. **User Engagement**: Understanding which prompts encourage continued usage
3. **Knowledge Retention**: Correlating prompt types with long-term learning retention
4. **Social Impact**: Measuring how prompts influence team knowledge sharing behavior

---

*"Start simple. Capture one learning today. Help one teammate tomorrow."* 