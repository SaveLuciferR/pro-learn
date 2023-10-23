import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHithLighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeLodashTemplate from "rehype-lodash-template"

const ProjectFile = ({ beforeFolder, obj, setSecondaryPath, setBeforeFolder }) => {

    const returnInBeforeFolder = () => {
        setSecondaryPath(beforeFolder);
        let path = new String(beforeFolder);
        path = path.split('/');
        console.log(path);
        setBeforeFolder(path.length - 2 < 0 ? undefined : path[path.length - 2]);
    }

    const md = "```" + obj.language + "\n" + obj.body + "\n```";

    return (
        <div className="project__file">

            <div className="project__file-info">
                <div className="project__file-info_button">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.125 4.375L7.875 10.5L13.125 16.625" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button onClick={() => returnInBeforeFolder()}>
                        Вернуться
                    </button>
                </div>
                <span>{obj.fileName}</span>
            </div>

            <ReactMarkdown className={"project__file-code"} children={md} rehypePlugins={[[rehypeLodashTemplate]]} components={{
                code: function code({ node, inline, className, showInlineLineNumbers, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHithLighter
                            children={String(children).replace(/\n$/, '')}
                            style={coldarkDark}
                            language={match[1]}
                            showLineNumbers={true}
                            showInlineLineNumbers={true}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>{children}</code>
                    )
                }
            }} />
        </div>
    );
}

export default ProjectFile;