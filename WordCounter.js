import { useState, useEffect } from 'react';
import { MetaTags } from "react-meta-tags";
import _ from 'lodash';

const WordCounter = () => {

    const [text, setText] = useState("");
    const [wordsUsed, setWordsUsed] = useState([]);
    const [wordCount, setWordCount] = useState(0);

    const countWords = (text) => {
        // Split words and remove any non-word characters, then filter blank values out
        let textArray = text?.trim().replaceAll(/[\n\W_]/g, " ").split(" ").filter(val => val !== "");
        let newWordsUsed = [];
        textArray?.map((word) => (
            // If word is found, increment usage, otherwise push to newWordsUsed
            newWordsUsed.find(w => w.word.toLowerCase() === word.toLowerCase())
                ? newWordsUsed.find(w => w.word.toLowerCase() === word.toLowerCase()).usage++
                : newWordsUsed.push({ word, usage: 1 })
        ));
        // Sort words list for table display, and sum the count
        setWordsUsed(_.orderBy(newWordsUsed, "usage", "desc"));
        setWordCount(textArray.length);
    }

    useEffect(() => {
        countWords(text);
        // eslint-disable-next-line
    }, [text]);

    return (
        <>
            <MetaTags>
                <title>Word Counter | Nuby - Dev</title>
                <meta name="description" content="This is the open-source word counter I've created &amp; shared as a public GitHub repository" />
            </MetaTags>
            <div className="grid grid-cols-10 gap-3 m-4 mb-16 mt-12 animate-fade-in-up sm:mt-16">
                <p className="text-gray-800 text-4xl col-span-9 sm:col-start-2">Word Counter</p>
                <textarea className="border border-gray-600 rounded-md p-2 col-span-10 sm:col-start-2 sm:col-end-6" style={{ marginTop: 0, minHeight: "200px" }} value={text} onChange={e => setText(e.target.value)} />
                <div className="col-span-11 font-semibold sm:col-span-1 sm:-mr-1 sm:pl-4">Word count: {wordCount?.toLocaleString()}<br />Character count: {text?.length?.toLocaleString()}</div>
                {(wordsUsed?.length &&
                    <table className="animate-fade-in border border-gray-600 divide-y divide-gray-600 col-span-6 mt-2 mr-4 w-full sm:col-start-7 sm:col-end-10 sm:mt-0 sm:ml-2 sm:mr-10">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Usage</th>
                            </tr>
                        </thead>
                        <tbody className="text-center divide-y divide-gray-600">
                            {wordsUsed?.map((word, id) => {
                                return (
                                    <tr key={id}>
                                        <td className="max-w-0 w-3/4 truncate p-2">{word.word.toLowerCase()}</td>
                                        <td className="whitespace-nowrap p-2">{`${word.usage} (${((word.usage / wordCount) * 100).toFixed(2)}%)`}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>) || null}
            </div>
        </>
    );
}

export default WordCounter;