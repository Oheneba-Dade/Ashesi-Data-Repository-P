"use client";
import TruncatedText from "@/components/TruncatedText";

export default function CollectionItem({collection_id, title, authors, abstract, date_of_publication, doi_link, keywords }) {
    const firstThreeKeywords = Array.isArray(keywords) && keywords.length > 0
        ? keywords[0]?.split(", ").slice(0, 3)
        : [];

    return (
        <li className="mb-8 text-sm text-ashesi-gray">
            <a href={`collections/${collection_id}`}>
                <h2 className="text-lg text-ashesi-red">{title}</h2>
            </a>
            <hr/>
            <TruncatedText text={abstract} maxLength={150} />

            {/* Authors - vertically stacked */}
            <div className="mt-4">
                <p className="flex flex-wrap">
                    <span className="font-semibold">authors:&nbsp;</span>
                    {authors?.length > 0 ? (
                        authors.map((author, index) => (
                            <span key={author.id}>
                                <a href={`mailto:${author.email}`} className="hover:text-blue-600">
                                    {author.name}
                                </a>
                                {index < authors.length - 1 ? ", " : ""}
                            </span>
                        ))
                    ) : (
                        <span>No author</span>
                    )}
                </p>
            </div>

            {/* DOI Link - vertically stacked */}
            <div className="mt-2">
                <a href={doi_link} target="_blank" rel="noopener noreferrer" className="block">
                    <p>
                        <span className="font-semibold">doi: </span>
                        {doi_link ? doi_link : "No DOI available"}
                    </p>
                </a>
            </div>

            {/* Date of Publication - vertically stacked */}
            <div className="mt-2">
                <p>
                    <span className="font-semibold">date of publication: </span>
                    {date_of_publication?.slice(0, 10)}
                </p>
            </div>

            {/* Keywords - vertically stacked */}
            <div className="mt-2">
                <p>
                    <span className="font-semibold">keywords: </span>
                    {keywords && keywords.length > 0 ? firstThreeKeywords.join(", ") : "No keywords available"}
                </p>
            </div>
        </li>
    );
}