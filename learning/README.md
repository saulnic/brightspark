# Learning engine

BrightSpark question generators should not render directly to React. They return a `LearningQuestion` contract and the UI renders that contract.

Every generated question must:

- have a stable skill/objective identifier
- use a deterministic seed
- carry a content version
- contain 2–4 meaningful choices
- contain exactly one correct choice
- pass `validateQuestion()` before display
- be reproducible later from its generator inputs

Generator-specific tests will add semantic invariants. Examples:

- a "largest number" answer must actually be the largest displayed number
- money answers must always be finite valid amounts
- measurement comparisons must not depend on ambiguous real-world assumptions
- displayed fractions must equal the stored answer
