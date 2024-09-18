# Contributing to Marshall Basic Calculator App

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Development Setup

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.

## Known Issues

### TypeScript Version Compatibility

Currently, there is a warning about TypeScript version compatibility:

```
WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.
SUPPORTED TYPESCRIPT VERSIONS: >=4.7.4 <5.6.0
YOUR TYPESCRIPT VERSION: 5.6.2
```

This warning does not cause any errors, and the project functions correctly. However, be aware of this when developing and consider the following options:

1. Wait for @typescript-eslint to update their supported TypeScript versions.
2. Downgrade TypeScript to the latest supported version (5.5.x) if you encounter issues.
3. Ignore the warning if everything is working as expected.

## Reporting bugs

We use GitHub issues to track public bugs. Report a bug by opening a new issue.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
