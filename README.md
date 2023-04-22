# minesweeper-clone
 A minesweeper clone for the browser.

 Play here: https://samuel-risner.github.io/minesweeper-clone/

# Btw
 I know how easy it is to cheat the game, but if you do not find the optimal way, then SHAME! SHAME! SHAME!

# Repo Structure
 There are two branches which are important: the "build" branch (this one) and the "deploy" branch.

 The "build" branch handles building the stuff for the webpage and contains all the files that you don't need to host on a webpage (config files etc.).

 The "deploy" branch on the other hand contains all the files needed for displaying the page, but not the stuff for building it (eg. the TypeScript files).

# Project Structure
 For compiling the stuff I cloned the "deploy" branch into the "build" branch. Meaning that there is a folder named "minesweeper-clone" containing all the stuff from the "deploy" branch. The folder is not tracked in this branch, since duplicate code sucks.
 
# Development (Windows cmd)

 ## Run the Python server for the first time

  1. Create a virtual environment:
   ```shell
    python -m venv venv
   ```

  2. Activate the virtual environment:
   ```shell
    venv\Scripts\activate
   ```

  3. Install the requirements:
   ```shell
    pip install -r requirements.txt
   ```

  4. Run the server:
   ```shell
    python main.py
   ```

  5. Stop the server:
   Hit CTRL+C

  6. Deactivate the virtual environment:
   ```shell
    deactivate
   ```

 ## Run the server for a second time
  Repeat steps 2, 4, 5 and 6.

 ## Install Node.js Stuff
  ```shell
   npm install -D
  ```

 ## Compile TypeScript 
  ```sh
   npm run build_ts
  ``` 

 ## Compile Tailwind CSS
  ```sh
   npm run build_tw
  ```

 ## Watch Tailwind CSS
 ```sh
  npm run watch_tw
 ```

 ## Watch TypeScript
 ```sh
  npm run watch_ts
 ```
