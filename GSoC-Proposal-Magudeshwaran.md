# GSoC 2026 Proposal: Universal Local Model Support for Gemini CLI

## Project Title

**Universal Local Model Support via Ollama/OpenAI-Compatible Providers**

---

## Proposal Summary

Gemini CLI currently relies exclusively on cloud-based Gemini models, limiting
its use in scenarios requiring offline operation, data privacy compliance, or
low-latency responses. This project proposes implementing comprehensive local
LLM support through Ollama and OpenAI-compatible API providers, enabling users
to run AI-powered workflows entirely offline while maintaining the same
ContentGenerator interface abstraction.

The implementation will introduce modular client adapters that integrate
seamlessly with Gemini CLI's existing architecture, allowing users to switch
between cloud Gemini models and local models (Ollama, LM Studio, LocalAI,
Ollama-compatible endpoints) through configuration without code changes. This
directly addresses the "Extensibility" and "Local Execution" focus areas in the
Gemini CLI roadmap.

---

## Problem Statement

1. **Offline Requirement**: Users in security-sensitive environments (fintech,
   healthcare, government) cannot use cloud-based AI due to data privacy
   regulations
2. **Latency Sensitivity**: Cloud round-trips add 2-5 seconds latency for simple
   operations; local models eliminate network overhead
3. **Cost Optimization**: Running local models eliminates API costs for
   high-volume use cases
4. **Developer Experience**: No unified way to configure and switch between
   local model providers

---

## Proposed Solution

### Architecture

Extend the ContentGenerator interface to support multiple provider backends
while maintaining a unified API surface:

```
ContentGenerator (Interface)
├── GeminiCloudContentGenerator (existing)
├── OllamaContentGenerator (NEW)
├── OpenAICompatibleContentGenerator (NEW)
└── LiteRTContentGenerator (existing)
```

### Implementation Plan

#### Phase 1: Core Infrastructure (Weeks 1-3)

- Add AuthType.OLLAMA and AuthType.OPENAI_COMPATIBLE to AuthType enum
- Create base local model client abstraction
- Implement Ollama API client with streaming support
- Add configuration schema for local endpoints

#### Phase 2: Provider Implementations (Weeks 4-6)

- Implement OpenAI-compatible API client (LM Studio, LocalAI, Ollama, etc.)
- Add tool calling support for local models
- Implement token counting and context window management
- Add model discovery (list available local models)

#### Phase 3: Integration (Weeks 7-9)

- Integrate with gemini config system
- Add CLI commands: `gemini config set model.provider ollama`
- Implement model fallback logic
- Add offline detection and graceful degradation

#### Phase 4: Polish & Testing (Weeks 10-12)

- Comprehensive test coverage (unit + integration)
- Performance benchmarking
- Documentation and examples
- Demo video and user guides

---

## Deliverables

1. **OllamaContentGenerator**: Full implementation supporting chat, streaming,
   embeddings, and tool calling
2. **OpenAiCompatibleContentGenerator**: Universal adapter for OpenAI-compatible
   APIs
3. **Configuration System**: ENV vars and config file support for local model
   settings
4. **CLI Commands**: New commands to list, manage, and switch local models
5. **Documentation**: Setup guides, troubleshooting, and examples
6. **Test Suite**: >80% coverage with unit and integration tests

---

## Timeline

| Week | Milestone                                                                  |
| ---- | -------------------------------------------------------------------------- |
| 1-2  | Research existing ContentGenerator patterns, setup development environment |
| 3    | Implement OllamaContentGenerator basic chat                                |
| 4    | Add streaming support, error handling                                      |
| 5    | Implement OpenAICompatibleContentGenerator                                 |
| 6    | Add tool calling, embeddings support                                       |
| 7    | Configuration system integration                                           |
| 8    | CLI commands implementation                                                |
| 9    | Model discovery, fallback logic                                            |
| 10   | Test coverage expansion                                                    |
| 11   | Documentation, examples                                                    |
| 12   | Performance testing, final polish                                          |

---

## Relevant Experience

- **PentAIGen**: Built a fintech AI agent with Google ADK, implementing secure
  multi-tenant architecture
- **Offline Vision App**: Developed Ollama + FastAPI integration for local image
  analysis
- **Zensar Technologies Internship**: Production-grade code quality experience
  in QE division
- **KeyGhost & SkillMatrix**: Built authentication and skill rating systems
  demonstrating full-stack capabilities

---

## Why This Project Matters

1. **Addresses Real Need**: Community discussions show strong demand for local
   model support
2. **Aligns with Roadmap**: Supports "Local Execution" and "Extensibility" focus
   areas
3. **Leverages My Skills**: Direct application of my Ollama + FastAPI experience
4. **Sustainable**: Local models are growing in popularity; this positions
   Gemini CLI as the bridge between cloud and local AI

---

## Risk Mitigation

- **Scope Creep**: Fixed 12-week timeline with clear phase gates
- **Technical Challenges**: Research existing patterns thoroughly before
  implementation
- **Testing**: Start with integration tests early to catch issues

---

## About Me

- **Name**: Magudeshwaran
- **Education**: 2nd Year B.Tech AI & Data Science, AVS Engineering College,
  Salem
- **Location**: Bengaluru/Salem, Tamil Nadu, India
- **Internship**: Zensar Technologies (QE Division, EMP-022)
- **Goals**: Build production-grade AI systems, contribute to open source, GSoC
  2026 selection

---

_This proposal was developed in collaboration with the Gemini CLI community
through discussion #24166_
