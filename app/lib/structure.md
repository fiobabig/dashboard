The root folder and each feature folder has a basic folder structure:

- feature
- model
- provider
- widget

If a folder would be empty it need not be included

Feature folders should provide an "index" file with children they're willing to allow parents to access. Children can always directly access their parent's files.

Model folders should should have an "index" file for convenience.

Provider and Widget files should provide only one public provider/widget (with the same name as the file), but you're free to have any number of private provider/widgets in that file.

Provider names should end with "provider"
