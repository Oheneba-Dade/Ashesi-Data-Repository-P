# Ashesi Data Repository Frontend

This is the frontend for the Ashesi Data Repository Project. It is a **Next.js** application that utilizes the **App Router** and is styled using **Tailwind CSS**.

## Features

## Project Structure

-   The typical directory structure should contain the following files where necessary

```
app/
 ├── directory/           # A route
 │    ├── page.js         # The main page (server component)
 │    ├── loading.js      # Skeleton loader
 │    ├── error.js        # Custom error page (if fetching fails)
 │    ├── layout.js       # Shared layout for sub-routes
 │    ├── template.js     # Forces re-render on navigation
 │    ├── utils/          # Helper functions (optional)
```

-   The alias `@/` is used to refer to the `src` directory. This alias is defined in the `jsconfig.json` file.

When importing files, do so like this:

```javascript
import { Component } from "@/components";
```

and not like this:

```javascript
import { Component } from "../../components";
```

## Fonts, Colors, Icons

-   The primary font for the project is **Montserrat**. Use like this

-   The red and gray Ashesi colors has been saved as a custom color in the `tailwind.config.js` file. The colors are named `ashesi-red` and `ashesi-gray` and have the values `#AA3C3F` and `#404041` respectively.
    When using either color, do so like this:

```html
<div className="text-ashesi-red">Hello, World!</div>
<div className="text-ashesi-gray">Hello, World!</div>
```

-   Icons are from the **Lucide** icon library.
