import {
    Component,
    signal,
    AfterViewInit,
    ViewChild,
    ElementRef,
    ViewEncapsulation,
    computed
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Editor from '@toast-ui/editor';

@Component({
    selector: 'app-markdown-editor',
    standalone: true,
    imports: [FormsModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./markdown-editor.html",
    styleUrl: "markdown-editor.css"
})
export class MarkdownEditor implements AfterViewInit {
    @ViewChild('editorContainer') editorElement!: ElementRef<HTMLDivElement>;

    public editorInstance: Editor;
    public articleTitle: string = '';
    titleError = signal<string | null>(null);


    content = signal<string>(`
    # The Evolution of Modern Web Development

Web development has come a long way since the early days of static websites. Today, developers build **dynamic**, **interactive**, and **highly responsive** applications that run across multiple devices and platforms. In this article, we explore the key aspects of modern web development and the tools that power it.

---

## Key Technologies

Modern web applications rely on a combination of **HTML**, **CSS**, and **JavaScript**, but frameworks and libraries have made development faster and more maintainable:

\`\`\`javascript
// Example: Basic component rendering in React
function Greeting({ name }) {
  return <h1>Hello, {name}! Welcome to the modern web.</h1>;
}
\`\`\`

Popular frameworks include:

- **React**: Component-based UI library
- **Vue.js**: Progressive framework for building UI
- **Angular**: Full-featured frontend framework

---

## Responsive Design

Websites must work across various devices, from mobile phones to large monitors. Responsive design techniques include:

1. **Flexible grids** with CSS Grid or Flexbox  
2. **Media queries** to adjust styles  
3. **Responsive images** for optimal loading

> "Good design is obvious. Great design is transparent." — Joe Sparano

---

## Version Control and Collaboration

Version control allows teams to work together efficiently. Git has become the standard for managing code:

\`\`\`bash
# Clone a repository
git clone https://github.com/example/project.git

# Create a new branch
git checkout -b feature/responsive-navbar
\`\`\`

Collaboration platforms like **GitHub** and **GitLab** also provide **pull requests**, **issue tracking**, and **CI/CD pipelines**.

---

## Web Performance Optimization

Performance is critical for user experience. Techniques include:

- Minifying CSS and JavaScript  
- Lazy-loading images and scripts  
- Using a **Content Delivery Network (CDN)**  
- Optimizing images and assets  

![Performance Illustration](https://slack.com/solutions/technology)

---

## Tables and Data Representation

| Technology | Popularity | Use Case           |
|-----------|------------|------------------|
| React     | High       | Frontend UI      |
| Vue.js    | Medium     | Frontend UI      |
| Angular   | Medium     | Large-scale apps |

---

## Task List

- [x] Learn modern JavaScript  
- [x] Explore React and Vue  
- [ ] Build a responsive portfolio  
- [ ] Optimize web performance  

---

## Inline HTML

<div style="color: blue; font-weight: bold;">
This is a highlighted note using inline HTML in Markdown.
</div>

---

## Code Blocks with Escaped Backticks

### JavaScript Example
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet("Developer");
\`\`\`

### Python Example
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Developer")
\`\`\`

---

## Footnotes

Modern web development emphasizes learning new tools[^1] and best practices[^2].

[^1]: Resources like [MDN Web Docs](https://developer.mozilla.org/en-US/) are essential.  
[^2]: Following coding standards improves collaboration and maintainability.

---

## Emojis

Web development is fun 😄🎉🚀. Never stop learning! ❤️👍

---

## Conclusion

The world of web development continues to evolve. Staying updated with frameworks, best practices, and performance optimization ensures your applications are **modern**, **efficient**, and **accessible**. Keep experimenting and building, and you'll stay ahead in this exciting field.

---

*Author: Jane Developer*  
*Published: November 2025*
`);

    ngAfterViewInit() {
        if (this.editorElement?.nativeElement) {
            this.editorInstance = new Editor({
                el: this.editorElement.nativeElement,
                height: 'auto',
                initialEditType: 'wysiwyg',
                initialValue: this.content(),
                previewStyle: 'vertical',
                hideModeSwitch: true,

            });
        }
    }


    onTitleChange(event: Event) {
        const length = this.articleTitle.trim().length;

        const maxLength = 60;
        const minLength = 30;

        if (this.articleTitle.length > maxLength) {
            this.articleTitle = this.articleTitle.slice(0, maxLength);
        }else if (length < minLength) {
            this.titleError.set('Title must be between 30~60 characters');
        } else {
            this.titleError.set(null);
        }

        const textarea = event.target as HTMLTextAreaElement;
        console.log(textarea.style.height);
        console.log(textarea.scrollHeight );

        // textarea.style.height = 'auto'; 
        // textarea.style.height = textarea.scrollHeight + 'px'; 
    }

    submitForm() {
            const markdown = this.editorInstance.getMarkdown();
            console.log(`# ${this.articleTitle}\n\n${markdown}`);
    }
}