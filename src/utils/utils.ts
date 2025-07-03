import { cssFileType, FileType, htmlFileType } from "../types/types";

export default function makeActiveByName<T extends { fileName: string }>(
    files: T[],
    name: string,
): T[] {
    const lowerName = name.toLowerCase().trim();

    return files.map((f) =>
        f.fileName.toLowerCase().trim() === lowerName
            ? { ...f, isOpen: true }
            : { ...f, isOpen: false },
    );
}

export const generateUniqueId = () => crypto.randomUUID();

export const updater = (
    files: FileType[],
    id: string,
    val: string,
): FileType[] =>
    files.map((file) =>
        file.fileId === id ? { ...file, content: val } : file,
    );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export const fileDefaultValue: FileType[] = [
    {
        fileId: generateUniqueId(),
        fileName: "index.html",
        language: "html",
        content: `<div class="welcome-message">
  <h1>Welcome!</h1>
  <p>
    We're glad you're here. This project is currently in development, so let us know if you encounter any issues.
  </p>
  <div class="contact-us">
    <p>Contact us:</p>
    <a href="https://github.com/Sachin-Mahato/code-editor.git" target="_blank">GitHub</a> |
    <a href="https://x.com/SachinXMahato" target="_blank">X (Twitter)</a> |
    <a href="https://www.linkedin.com/in/sachinkumarmahato/" target="_blank">LinkedIn</a>
  </div>
</div>`,
        isOpen: true,
    },
    {
        fileId: generateUniqueId(),
        fileName: "style.css",
        language: "css",
        content: `.welcome-message {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* stylelint-disable-next-line */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #333;
}

.welcome-message h1 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 10px;
}

.welcome-message p {
  font-size: 1.1em;
  color: #555;
}

.contact-us {
  margin-top: 20px;
  font-size: 1em;
  color: #666;
}

.contact-us a {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  font-weight: 500;
}

.contact-us a:hover {
  color: #3498db;
  text-decoration: underline;
}
`,
        isOpen: false,
    },
];

export const htmlDefaultValue: htmlFileType[] = [
    {
        fileId: generateUniqueId(),
        fileName: "index.html",
        language: "html",
        content: `<div class="welcome-message">
  <h1>Welcome!</h1>
  <p>
    We're glad you're here. This project is currently in development, so let us know if you encounter any issues.
  </p>
  <div class="contact-us">
    <p>Contact us:</p>
    <a href="https://github.com/Sachin-Mahato/code-editor.git" target="_blank">GitHub</a> |
    <a href="https://x.com/SachinXMahato" target="_blank">X (Twitter)</a> |
    <a href="https://www.linkedin.com/in/sachinkumarmahato/" target="_blank">LinkedIn</a>
  </div>
</div>`,
        isOpen: false,
    },
];

export const cssDefaultValue: cssFileType[] = [
    {
        fileId: generateUniqueId(),
        fileName: "style.css",
        language: "css",
        content: `.welcome-message {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #333;
}

.welcome-message h1 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 10px;
}

.welcome-message p {
  font-size: 1.1em;
  color: #555;
}

.contact-us {
  margin-top: 20px;
  font-size: 1em;
  color: #666;
}

.contact-us a {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  font-weight: 500;
}

.contact-us a:hover {
  color: #3498db;
  text-decoration: underline;
}
`,
        isOpen: false,
    },
];


export function isValidString(str: string):boolean {
  const match = /^[A-Za-z][A-Za-z\s]*$/;

  const value = str.trim();
   
    if(!match.test(value)){
      return false;
    }
  return true;
}

isValidString("Hello")