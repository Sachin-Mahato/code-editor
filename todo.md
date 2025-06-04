**Upcoming features**

---

- Tabs -> done 
- Debouncing -> done
- Testing

```html
<div class="welcome-wrapper">
  <div class="welcome-container">
    <h1 class="typewriter">Welcome to the Web Code Editor</h1>
    <p class="fade-in">
      This app is currently under active development. New features will be added soon.<br>
      If you encounter any issues or have suggestions, please <a href="https://github.com/yourusername" target="_blank">contact me on GitHub</a>.
    </p>
  </div>
</div>
```


```css
.welcome-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.welcome-container {
  max-width: 600px;
  text-align: center;
}

.typewriter {
  overflow: hidden;
  border-right: 0.15em solid #00ffcc;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.05em;
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
  font-size: 2em;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 2s ease 3s forwards;
  font-size: 1.1em;
  color: #cccccc;
  margin-top: 20px;
  line-height: 1.6;
}

.fade-in a {
  color: #00ffcc;
  text-decoration: none;
}

.fade-in a:hover {
  text-decoration: underline;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #00ffcc; }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

```
