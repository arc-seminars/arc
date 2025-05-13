## About
This is the repository controlling the website for ARC Seminars at Caltech.
It is sorted under the "arc-seminars" Github organization.
The website directory is here:

```
https://arc-seminars.github.io/arc/
```

**Before editing:** make sure to pull the most recent version of the repository:

```
git pull
```

## For editors: quick start

This is a step-by-step list for setting up the ability to edit the site.

1. Install Hugo [here](https://gohugo.io/installation/)

   *Hugo is a static site generation tool which is used to turn the contents of this repository into a working website.*

2. Login to a Github account which has access to the `arc` repository.

3. In terminal, navigate to the path where you want to clone the `arc` repository.
   Then, type:

   ```
   git clone git@github.com:arc-seminars/arc.git
   ```

   *This should make a directory called `arc/` in your current working directory.*

4. Do the following command:

   ```
   cd arc; git submodule add https://github.com/math-queiroz/rusty-typewriter.git themes/rusty-typewriter
   ```

   This should add the `rusty-typewriter` repository as a submodule inside of the `arc/themes` directory.
   `rusty-typewriter` is the Hugo theme that this site uses.

5. To test the site locally, do:

   ```
   hugo server
   ```

   The resulting output in the terminal should look something like this:

   ```
   Web Server is available at http://localhost:1313/arc/ (bind address 127.0.0.1)
   ```

   Navigate to the hyperlink shown.
   This is what the website looks like.

## For editors: modifying the site

As a Github repository, the website is version controlled using Git.
If you know how to use Git, you can simply make pushes or pull requests in the usual way.
Otherwise, please consult the following instructions:

1. Add or change files to the Git repository.
   Take note not to change anything in the `themes/rusty-typewriter/` directory.

   If you feel the need to change something in, e.g., `themes/rusty-typewriter/layouts/`, instead modify the corresponding file in `layouts/` (or create it if it does not yet exist).
   Files in `themes/rusty-typewriter/layouts/` are only used by default if the corresponding file in `layouts/` does not exist.

2. Add files you have changed using

   ```
   git add <YOUR MODIFIED FILE HERE>
   ```

   You can see which files are staged for commit by doing `git status` or `git status -uno` (which omits new files which have never been committed before).
   Make sure that every file you want updated or created is under changes `staged for commit`.

   *Do not commit anything from the `public` directory. This is regenerated every time you use `hugo server`, and should not be version-controlled.*

3. Once you have implemented a feature, commit your change:

   ```
   git commit -m "<YOUR INSTRUCTIVE MESSAGE HERE>"
   ```

   *If you are pushing a minor change that does not affect how the website looks (e.g., updating the `README`), include a string such as `[skip ci]` within one of your commit messages. See [here](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/skipping-workflow-runs) for more information about skipping Github actions.*

4. To update the website on the remote repository (i.e., on `github.com`), push your changes to the remote (i.e., update the changes on `github.com`):

   ```
   git push -u origin main
   ```

   *If you did not intentionally skip the Github action (see item 3. above), Github will start an action to create the website. You can see the progress of the action [here](https://github.com/arc-seminars/arc/actions/). Once the action is finished, your changes should show up on the public site.*

## For editors: adding, updating, or cancelling a seminar

Adding, updating, or cancelling a seminar falls under updating the website, so you should follow the previous instructions to do this.
This Section describes some extra details.

### Adding a new seminar

To **add a new seminar**, create a new markdown (`.md`) file inside of `content/seminars/` (see existing talks in this directory for examples).
The easiest way to do this is by copying a recent markdown file and editing that.

Please follow the naming conventions, `year_month_day_firstinitial+lastname.md` where the full four digits of the year are given and leading zeros on the month and day are omitted.

Comments are given by `#`.
Currently most seminar markdown files have a lot of commented out tags, to remind the editor which tags have been used before (and to keep things consistent).

If there are no resources, remove all the bullet points under `resources:` (starting with `-`) and add `[]` after `resources:` to indicate that it is an empty list.

To **add a YouTube link**, navigate to the YouTube video and copy the short string of characters (shortcode) after `https://www.youtube.com/watch?v=` (and before `&...`).
It should look something like this `dQw4w9WgXcQ`.
Then add the shortcode as `recordingYouTubeShortcode: "dQw4w9WgXcQ"`.
If there is no recording, it should instead look like `recordingYouTubeShortcode: null`.

### Cancelling a seminar

To **cancel a seminar**, just modify the `cancelled:` field to `cancelled: true`.
*Do not delete the seminar markdown file.*

*This allows the page to be viewed through a hyperlink (the page will indicate that the seminar has been cancelled). However, the seminar will not show up on the front page or any lists of seminars.*
