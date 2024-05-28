import React from "react";

export default function BookmarkNewsPage(props) {
    let { onDelete, handleDeleteAll, bookmarkArray } = props;

    return (
        <div className="container " style={{ marginTop: "80px" }}>
            {bookmarkArray.length !== 0 ? (
                <>
                    <div class="d-flex justify-content-between mb-4">
                        <h3>My Bookmark</h3>
                        <button
                            className="btn btn-sm btn-light ms-2"
                            title="Delete All"
                            onClick={() => handleDeleteAll()}
                        >
                            Delete All
                        </button>
                    </div>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookmarkArray.map((element, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.title}</td>
                                    <td>{element.description}</td>
                                    <td>
                                        <div className="d-flex">
                                            <a
                                                rel="noreferrer"
                                                href={element.newsUrl}
                                                target="_blank"
                                                className="btn btn-sm btn-light"
                                                title="View"
                                            >
                                                View
                                            </a>
                                            <button
                                                className="btn btn-sm btn-light ms-2"
                                                title="Delete"
                                                onClick={() => onDelete(element.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div class="d-flex justify-content-center mb-4">
                    <h3>Please Add Bookmark</h3>
                </div>
            )}
        </div>
    );
}
