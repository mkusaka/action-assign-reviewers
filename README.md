# action-assign-reviewers
An action which add reviwers to the pull request.

## Usage

```yml
name: Assign

on:
  pll_request:
    types: [opened]

jobs:
  request-review:
    runs-on: ubuntu-latest
    steps:
      - uses: mkusaka/action-assign-reviewers@v0.0.4
        with:
          reviewers: |
            user-1
            user-2
```

## License
MIT
