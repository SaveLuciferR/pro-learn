import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom';
import { Prism as SyntaxHithLighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeLodashTemplate from "rehype-lodash-template"
import emojione from 'emojione'

const ProjectReadme = ({ markdownFile }) => {

    const renderers = {
        code: function code({ node, inline, className, showInlineLineNumbers, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            // console.log(node);
            return !inline && match ? (
                <SyntaxHithLighter
                    className={'project__file-code'}
                    children={String(children).replace(/\n$/, '')}
                    style={coldarkDark}
                    language={match[1]}
                    showLineNumbers={true}
                    showInlineLineNumbers={true}
                    PreTag="div"
                    {...props}
                />
            ) : (
                <code className={'markdown-p'} {...props}>{children}</code>
            )
        },
        h1: function h1({ node, children, ...props }) {
            return <>
                <h1 id={props.href} className='markdown-h1' {...props}>{children}</h1>
                <hr className='markdown-hr' />
            </>
        },
        h2: function h2({ node, children, ...props }) {
            return <h2 className='markdown-h2' {...props}>{children}</h2>
        },
        h3: function h3({ node, children, ...props }) {
            return <h3 className='markdown-h3' {...props}>{children}</h3>
        },
        h4: function h4({ node, children, ...props }) {
            return <h4 className='markdown-h4' {...props}>{children}</h4>
        },
        h5: function h5({ node, children, ...props }) {
            return <h5 className='markdown-h5' {...props}>{children}</h5>
        },
        h6: function h6({ node, children, ...props }) {
            return <h6 className='markdown-h6' {...props}>{children}</h6>
        },
        p: function p({ node, children, ...props }) { // Эмоджи не работают
            // let input = children;
            // let emojified = "";
            // if (typeof input === 'string') {
            //     emojified = input.replace(!(/:(\w+:)/g), '');
            //     emojified = emojione.shortnameToImage(input);
            //     if (emojified.length !== 0) {
            //         console.log(emojified)
            //         return <div dangerouslySetInnerHTML={{ __html: emojified }}></div>
            //     }
            // }
            return <>
                <p className='markdown-p' {...props}>{children}</p>
            </>
        },
        strong: function strong({ node, children, ...props }) {
            return <strong className='markdown-strong' {...props}>{children}</strong>
        },
        em: function em({ node, children, ...props }) {
            return <em className='markdown-em' {...props}>{children}</em>
        },
        del: function del({ node, children, ...props }) {
            return <del className='markdown-strong' {...props}>{children}</del> // Перечеркнутый текст не работает
        },
        a: function a({ node, children, ...props }) {
            return <Link to={props.href} className='markdown-a' {...props}>{children}</Link>
        },
        ol: function ol({ node, children, ...props }) {
            return <ol className='markdown-ol' {...props}>{children}</ol>
        },
        hr: function hr({ node, children, ...props }) {
            return <hr className='markdown-hr' {...props} />
        },
    };

    return (
        <ReactMarkdown
            components={renderers}
            className={"project__readme"}
            children={markdownFile}
            rehypePlugins={[[rehypeLodashTemplate]]}
        />
    );
}

export default ProjectReadme;