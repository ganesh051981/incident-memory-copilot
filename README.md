# Incident Memory Copilot

> Don't debug from zero.

Incident Memory Copilot is an AI-powered incident response workspace that helps engineers investigate production failures using organizational memory from previous incidents.

The core idea is simple:

* **Hindsight = Organizational Memory**
* **Groq = Reasoning Layer**

Instead of starting every incident from scratch, the system recalls relevant historical knowledge first and uses that context to generate practical guidance.

**Live Demo:** https://incident-memory-copilot.vercel.app/
**GitHub:** https://github.com/ganesh051981/incident-memory-copilot

---

## Problem

During production incidents, engineers often need to answer the same questions repeatedly:

* Have we seen this failure before?
* What caused it previously?
* What fixed it?
* What should we check first?
* Did another service experience a similar problem?

Important incident knowledge can become scattered across past incidents, fixes, and team experience.

Incident Memory Copilot turns that previous experience into reusable organizational memory.

---

## Core Concept

```text
Current Incident
       |
       v
Hindsight Recall
       |
       v
Relevant Historical Memory
       |
       v
Groq Reasoning
       |
       v
Incident Guidance
       |
       v
Engineer Resolution
       |
       v
Hindsight Retain
       |
       v
Future Incidents Can Recall The Lesson
```

The continuous learning loop is:

```text
Recall -> Reason -> Resolve -> Retain
```

---

## Key Features

### 1. Incident Analysis

Describe a current production incident.

The system:

1. Recalls relevant historical knowledge from Hindsight.
2. Uses that memory as context.
3. Uses Groq to generate incident reasoning and practical actions.

### 2. Organizational Memory

Browse retained incident knowledge including:

* Incident ID
* Service
* Severity
* Root cause
* Resolution
* Engineering lesson

### 3. Memory Copilot

Ask questions about previous incidents and organizational knowledge.

Example:

```text
What was the permanent fix for the Redis incident?
```

The workflow is:

```text
Question -> Hindsight Recall -> Groq -> Memory-Informed Answer
```

### 4. Incident Archive

View historical incidents and their resolutions in a structured archive.

### 5. Incident Analytics

Visualize incident patterns including:

* Incidents by service
* Severity distribution
* Service concentration
* Peak-latency demo telemetry
* Incident activity

Latency values labelled as demo telemetry are illustrative dashboard values, not live production monitoring data.

### 6. Resolve and Retain

Capture:

* Symptoms
* Root cause
* Immediate fix
* Permanent fix

The resolution can then be retained as future organizational memory.

---

## Dashboard

The application provides a unified operator-style dashboard:

```text
Overview
Analyze
Memory
Incidents
Memory Copilot
Analytics
Resolve
```

The dashboard keeps Hindsight organizational memory at the center of the incident-response workflow.

---

## Architecture

```text
                     +----------------------+
                     |      Engineer        |
                     +----------+-----------+
                                |
                                v
                  +--------------------------+
                  | Incident Memory Copilot  |
                  +------------+-------------+
                               |
                 +-------------+-------------+
                 |                           |
                 v                           v
        +----------------+          +----------------+
        |    Hindsight   |          |      Groq      |
        |  Memory Layer  |          | Reasoning Layer|
        +-------+--------+          +--------+-------+
                |                            |
                +-------------+--------------+
                              |
                              v
                    Incident Guidance
                              |
                              v
                    Engineer Resolution
                              |
                              v
                     Hindsight Retain
```

---

## Technology Stack

| Technology   | Purpose                                   |
| ------------ | ----------------------------------------- |
| Next.js      | Full-stack web application                |
| React        | User interface                            |
| TypeScript   | Application development                   |
| Tailwind CSS | Styling                                   |
| Hindsight    | Organizational memory and retrieval       |
| Groq         | AI reasoning and conversational responses |
| Vercel       | Deployment                                |
| GitHub       | Source control                            |

---

## Application Routes

| Route        | Purpose                                |
| ------------ | -------------------------------------- |
| `/`          | Incident operations dashboard          |
| `/analyze`   | Analyze a current incident             |
| `/memory`    | Browse organizational memory           |
| `/incidents` | Historical incident archive            |
| `/chat`      | Ask the Memory Copilot                 |
| `/analytics` | Incident and service analytics         |
| `/resolve`   | Capture and retain incident resolution |

### API Routes

| API            | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `/api/analyze` | Hindsight recall and Groq incident analysis       |
| `/api/chat`    | Hindsight recall and Groq conversational response |
| `/api/resolve` | Retain resolved incident knowledge in Hindsight   |

---

## Demo Incident Domains

The current demo contains examples covering:

### Authentication

`INC-AUTH-001`

Identity-provider certificate rotation failure.

### Redis Cache

`INC-CACHE-001`

Cache eviction policy configuration failure.

### Payment API

`INC-PAY-001`

Long-running analytics workload causing database connection exhaustion.

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ganesh051981/incident-memory-copilot.git
cd incident-memory-copilot
```

Install dependencies:

```bash
npm install
```

Configure the required environment variables in `.env.local`:

```env
HINDSIGHT_API_URL=your_hindsight_api_url
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_BANK_ID=your_hindsight_bank_id
GROQ_API_KEY=your_groq_api_key
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

Never commit API keys or `.env.local`.

---

## Demo Flow
q
```text
Dashboard
   |
   v
Analyze Incident
   |
   v
Hindsight Recalls Historical Memory
   |
   v
Groq Generates Memory-Informed Reasoning
   |
   v
Review Organizational Memory
   |
   v
Ask Memory Copilot
   |
   v
Review Analytics
   |
   v
Resolve Incident
   |
   v
Retain New Knowledge
```

---

## Why This Is Different

A normal chatbot can generate an answer from its model knowledge.

Incident Memory Copilot adds organizational memory before reasoning:

```text
Incident
   |
   v
What has our organization learned before?
   |
   v
Hindsight
   |
   v
Historical Evidence
   |
   v
Groq
   |
   v
Memory-Informed Reasoning
```

The goal is to make previous incident experience reusable instead of allowing every new incident to start from zero.

---

## Future Scope

Possible extensions include:

* Integration with observability platforms
* Live latency and service-health telemetry
* Automated incident correlation
* Advanced incident similarity detection
* Runbook generation
* Continuous organizational learning

---

## Production

**Live Demo:**
https://incident-memory-copilot.vercel.app/

**Source Code:**
https://github.com/ganesh051981/incident-memory-copilot

---

## Core Message

> A new incident shouldn't mean starting from zero.

Incident Memory Copilot connects organizational memory with AI reasoning so previous incident experience can become reusable engineering knowledge.
