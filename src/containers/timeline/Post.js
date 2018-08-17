import React, {Component} from "react";
import propTypes from "prop-types";
import {getAvatarOf} from "./author-avatar";

class Post extends Component {

    render() {
        const {
            imageUrl,
            author,
            caption
        } = this.props;

        const avaAuthor = getAvatarOf({name: author.username, gender: author.gender});

        return (
            <div
                style={{
                    border: "1px solid #e6e6e6",
                    borderRadius: 3
                }}
            >
                <div style={{padding: 16}}>
                    <img
                        src={avaAuthor}
                        width="30px"
                        style={{
                            borderRadius: 30
                        }}
                    />
                    <span
                        style={{
                            paddingLeft: 14,
                            fontWeight: 600
                        }}
                    >{author.username}</span>
                </div>
                <img
                    src={imageUrl}
                    width="100%"
                />
                <div style={{padding: 16}}>
                    <span
                        style={{
                            fontWeight: 400
                        }}
                    >{caption}</span>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    imageUrl: propTypes.string
};

export default Post;