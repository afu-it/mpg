```markdown
# mpg Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the `mpg` repository, a TypeScript project built with the Astro framework. You'll learn about file naming, import/export styles, commit patterns, and how to write and organize tests. This guide also suggests useful commands for common workflows.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `getData.ts`

### Import Style
- Use **relative imports** throughout the codebase.
  - Example:
    ```typescript
    import { getUser } from './userUtils';
    ```

### Export Style
- Use **named exports** rather than default exports.
  - Example:
    ```typescript
    // userUtils.ts
    export function getUser(id: string) { ... }
    ```

### Commit Patterns
- Commit messages are **freeform** (no strict structure).
- Some commits use prefixes, but not consistently.
- Average commit message length: ~36 characters.

## Workflows

### Adding a New Feature
**Trigger:** When you need to implement a new feature.
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Write your feature using TypeScript and Astro conventions.
3. Use relative imports for any dependencies.
4. Export your functions or components using named exports.
5. Write corresponding tests in a `.test.ts` file.
6. Commit your changes with a descriptive message.

### Refactoring Code
**Trigger:** When improving or restructuring existing code.
**Command:** `/refactor`

1. Identify the code to refactor.
2. Update file names to camelCase if needed.
3. Ensure all imports remain relative.
4. Use named exports consistently.
5. Update or add tests as necessary.
6. Commit with a message describing the refactor.

### Writing Tests
**Trigger:** When adding or updating tests.
**Command:** `/write-test`

1. Create a test file with the pattern `*.test.ts`.
2. Write tests for your functions or components.
3. Use the same import/export conventions as production code.
4. Run your tests (testing framework is unspecified).
5. Commit your test changes.

## Testing Patterns

- Test files follow the pattern: `*.test.ts`
- Place tests alongside the code they cover or in a dedicated test directory.
- Use TypeScript for writing tests.
- The specific testing framework is not specified; follow project conventions or consult the team for details.

## Commands
| Command        | Purpose                                      |
|----------------|----------------------------------------------|
| /add-feature   | Scaffold and implement a new feature         |
| /refactor      | Refactor existing code following conventions |
| /write-test    | Add or update tests for code changes         |
```
