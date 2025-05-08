# **[Version 0.0.1]** - 2025-02-04 - 12:00PM

-   beginning of the changlog, "first" iteration

### Changes

#### App.jsx

-   `features section styling`: changed some mobile styling for the features section

#### NavBar.jsx

-   `Discord Link`: Added an anchor to surround the discord button instead of only anchoring the text inside the button

#### index.css

-   `:root`: added :root to index.css to set global variables

#### ContentGrid.jsx

-   `styling`: Removed the hover border color from grid items

#### Platforms.jsx

-   `function Icons({ pMap })`: Added a Icons func to make the code more readable

-   `styling`: changed some of the styling to fix an overlap issue

# **[Version 0.0.2]** - 2025-02-04 - 12:30PM

-   goal: diagnose size issues of navbar when resizing window, and on mobile

### Changes

#### NavBar.jsx

-   added some comments, removed some arbitrary tailwind classes

-   removed contact and pricing buttons when viewport is too small

# **[Version 0.0.3]** - 2025-02-05 - 1:10PM

-   fixed styling issue on mobile.

### Added

#### Pricing.jsx

-   Simple pricing button, will implement pricing popup later.

# **[Version 0.0.4]** - 2025-02-05 - 2:10PM

-   added pricing popup and animation

### Added

-   the viewport will auto scroll to the center of the popup when its opened.

### TODO

-   link the pricing button to the pricing popup
