import { useState, useEffect } from "react";

const WordCounter = () => {

    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [wordsList, setWordsList] = useState([]);
    const [filteredWordsList, setFilteredWordsList] = useState();

    const countWords = (text) => {
        // Removes all non-word characters & counts words
        let list = text && (text.trim().replaceAll(/[\W_]/g, " ").split(" ")).filter(val => val !== "");
        setWordsList(list);
        setWordCount(list.length);
    }

    useEffect(() => {
        countWords(text);
    }, [text]);

    useEffect(() => {
         // Removes duplicate words
        const res = wordsList && wordsList.map(word => typeof word === "string" ? word.toLowerCase() : word);
        setFilteredWordsList([...new Set(res)]);
    }, [wordsList])

    return (
        <div className="grid grid-cols-10 gap-3 m-4 mb-16 mt-12 animate-fade-in-up sm:mt-16">
            <p className="text-gray-800 text-4xl col-span-9 sm:col-start-2">Word Counter</p>
            <textarea className="border border-gray-600 rounded-md p-2 col-span-10 sm:col-start-2 sm:col-end-6" style={{ marginTop: 0, minHeight: "200px" }} value={text} onChange={e => setText(e.target.value)} />
            <div className="col-span-11 font-semibold sm:col-span-1 sm:-mr-1 sm:pl-4">Word count: {wordCount.toLocaleString()}<br />Character count: {text.length.toLocaleString()}</div>
            {wordsList && filteredWordsList &&
                <table className="animate-fade-in border border-gray-600 divide-y divide-gray-600 col-span-6 mt-2 mr-4 w-full sm:col-start-7 sm:col-end-10 sm:mt-0 sm:ml-2 sm:mr-10">
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Usage</th>
                        </tr>
                    </thead>
                    <tbody className="text-center divide-y divide-gray-600">
                        {/* Maps through the filtered word list, renders them & calculates usage based off total words in the wordsList array */}
                        {wordsList && filteredWordsList && filteredWordsList.map((word, id) =>
                            <tr key={id}>
                                <td className="max-w-0 w-3/4 truncate p-2">{word}</td>
                                <td className="whitespace-nowrap p-2">{`${wordsList.filter(totalWords => word.toLowerCase() === totalWords.toLowerCase()).length.toLocaleString()} (${((wordsList.filter(totalWords => word.toLowerCase() === totalWords.toLowerCase()).length) / ((wordsList.length)) * 100).toFixed(2)}%)` || ""}</td>
                            </tr>)}
                    </tbody>
                </table>}
        </div>
    );
}

export default WordCounter;