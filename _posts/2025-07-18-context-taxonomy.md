---
layout: post
title: "Context taxonomy"
date: "July 18, 2025"
code: true
---

[A Survey of Context Engineering for Large Language Models](https://arxiv.org/abs/2507.13334)

structured taxonomy that classifies the multifaceted techniques used to design, manage, and optimize context

- Foundational components
    - Context retrieval & generation
        - e.g., Chain-of-thought, Zero-shot COT, ToT, GoT, Self-consistency, ReAct, Auto-CoT, Automatic Prompt, CLEAR framework, RAG, Cognitive prompting, KAPING, Dynamic assembly
    - Context processing
        - e.g., Mamba, LongNet, FlashAttention, Ring Attention, YaRN, Infini-attention, StreamingLLM, InfLLM, Self-Refine, Reflexion, StructGPT, GraphFormers, KG Integration, Long COT, MLLMs
    - Context management
        - e.g., Context Compression, StreamingLLM, KV Cache Management, Heavy Hitter Oracle, Hierarchical Memory, Recurrent Context Compression, Activation Refilling, Context Window Management
- Implementations
    - Retrieval augmented generation
        - e.g., FlashRAG, KRAGEN, ComposeRag, Self-RAG, CDF-RAG, Graph-RAG, LightRAG, HippoRAG, RAPTOR, RAG-Gym, Agentic RAG Systems, Graph-Enhanced RAG, Modular RAG Architectures
    - Memory systems
        - e.g., MemoryBank, MemLLM, Self-Controlled Memory, REMEMBERER, MemOS, Charlie Mnemonic, RecMind, Sandbox, LongMemEval, MADail-Bench, MEMENTO, A-MEM, CAMELoT, Architectures, Short-term & Long-term memory, MemGPT, Memory-Enhanced Agents
    - Tool-integrated reasoning
        - e.g., Toolformer, ReAct, Gorilla, ToolLLM, Granite-FunctionCalling, Program-Aided Language Models, ToRA, ReTool, Chameleon, a1, API-Bank, MCP-RADAR, GTA benchmark, PLAY2PROMPT
    - Multi-agent systems
        - e.g., KQML, FIPA ACL, MCP protocols, A2A, ACP, ANP, AutoGen, MetaGPT, CAMEL, CrewAI, Swarm Agent, 3S orchestrator, SagaLLM, Communication Protocols, Orchestration, Coordination Strategies, Agent Communication Languages, CoA
- Evaluation
    - Evaluation frameworks
        - e.g., Component-Level Assessment, System-Level Integration, Self-Refinement, MCP-RADAR, LongMemEval, BFCL Tool Evaluation, SagaLLM, Brittleness Assessment, Contextual Calibration, Multi-dimensional Feedback
    - Benchmark datasets
        - e.g., GAIA, GTA, WebArena, VideoWebAreana, Deep Research Bench, StableToolBench, NesTools, ToolHop, T-Eval, BFCL, NarrativeQA, MEMENTO, API-Bank, Mind2Web, SWE-Bench
    - Evaluation challenges
        - e.g., Performance gap assessment, Memory system isolation problems, O(n^2) scaling limitations, Transactional integrity, Multi-tool Coordination, Self-Validation Dependencies, Context Handling Failures, Attribution Challenges, Safety-oriented evaluation, Agent assessment, orchestration evaluation
- Future directions & challenges
    - Foundation research
        - e.g., Theoretical foundations, scaling laws, O(n^2) computational challenges, Multi-modal integration, compositional understanding, context optimization, Frameworks for Multi-agent coordination, Information-theoretic analysis
    - Technical innovation
        - e.g., LongMamba, Sliding Attention, Memory-Augmented Architectures, Modular RAG, GraphRAG, Context Assembly Optimization, Tool-integrated reasoning, Agentic systems, Self-refinement mechanisms
    - Application-driven research
        - e.g., Domain specialization, Healthcare applications, Protocol standardization, MCP/A2A/ACP/ANP protocols, Human-AI collaboration, security issues, production deployment scalability, safety and ethical considerations


In prompt engineering, Context is treated as a monolithic, static string of text.

In context Engineering, Context is treated as a dynamically structured set of informational components. These components are sourced, filtered, and formatted by a set of functions, and finally orchestrated by a high-level assembly function.

Context engineering components
- **Instruction:** System instructions and rules (Context Retrieval and Generation)
- **Knowledge:** External knowledge, retrieved via functions like RAG or from integrated knowledge graphs (RAG, Context Processing)
- **Tools:** Definitions and signatures of available external tools (Function Calling & Tool-Integrated
Reasoning)
- **Memory:** Persistent information from prior interactions (Memory Systems, Context Management)
- **State:** The dynamic state of the user, world, or multi-agent system (Multi-Agent Systems & Orchestration)
- **Query:** The user’s immediate request.

From this perspective, Context Engineering is the formal optimization problem of finding the ideal set of context-generating functions that maximizes the expected quality of the LLM’s output.

This optimization is subject to hard constraints, most notably the model’s context length limit.

##

[LLM-Based Human-Agent Collaboration and Interaction Systems: A Survey](https://arxiv.org/abs/2505.00753)
