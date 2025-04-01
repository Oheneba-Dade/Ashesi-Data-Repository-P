# Guidelines To Ensure Consistency

## Branch Naming Convention:

-   Use the following format for branch names: `feature/feature-name` or `bug/bug-name`.
-   For example, if you are working on a feature to add a new page to the website, the branch name should be `feature/add-new-page`.

## Commit Messages:

-   Use the following format for commit messages: `type: message`.
-   The `type` can be one of the following: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, or `chore`.
-   For example, if you are adding a new feature to the website, the commit message should be `feat: add new feature`.

## Pull Requests:

-   the `dev` branch is the active branch for development. Make all PRs to this branch and **NOT** `main`. `main` will only be updated when we are production ready.
-   Use the following format for pull request titles: `Feature: Feature Name` or `Bug: Bug Name`.
-   For example, if you are working on a feature to add a new page to the website, the pull request title should be `Feature: Add New Page`.

## Code Review:

-   Make sure to review the code before merging the pull request.
-   Ensure that the code is well-documented and follows the coding standards.

## Testing:

-   Write test cases for the code you have written.
-   Make sure that the code passes all the test cases before merging the pull request.

## Code Style:

### React and Javascript

1. Components and their corresponding files should be capitalized : **Home.js -> function Home(){ }**
2. Use PascalCase for components with composite names: `ForgotPassword`
3. All folders should be small letters : **home -> Home.js -> function Home(){ }**
4. Folders with composite names should be underscored : **single_page, not singlePage**
5. Files with composite names should be hyphenated: **table-styles.modules.scss, not tableStyles.module.scss**
6. If a component is used only on one page, put it as a subfolder in the page's folder.
7. Components that will be-reused in other places should be placed in the **components** folder.
8. Components and all their related stylesheets should be in the same folder. Example: the **button** folder should contain the **Button.js** component and **button.module.scss** file.
9. All imports should be arranged exactly like this (the imports below are merely examples)

```js
// libraries
import React from "react";

// components
import { Form } from "components/Form";

// styles
import "./index.scss";

// utils
import { debounce } from "utils/debounce.js";
```

### Flask and Python

-   Use snake_case for variable names.
-   Use PascalCase for class names.
-   Use `@app.route` for defining routes.
-   Use `try` and `except` for error handling.
-   Use reStructuredText (reST) style for docstrings. For example:

```py
def func_rest(param1, param2):
    """Summary line.

    :param param1: Description of param1
    :type param1: int
    :param param2: Description of param2
    :type param2: str
    :returns: Description of return value
    :rtype: bool
    """
    return True
```
