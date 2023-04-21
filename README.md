# MineSweeper-Clone 
 A MineSweeper clone for the browser. 
# How to run the game 
## Play online in browser (Firefox desktop) 
 https://htmlpreview.github.io/?https://github.com/chamaedorea-productions/MineSweeper-Clone/blob/main/index.online_firefox_desktop.html 
## Play offline in browser (Firefox desktop) 
 Download the repo and open "index.offline_firefox_desktop.html" in your browser. 
# Btw 
 I know how easy it is to cheat the game, but if you do not find the optimal way, then SHAME! SHAME! SHAME! 

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
