import React, {Component} from "react";
import {Container, Col, Form, FormGroup, Input, Label, Button, Row} from "reactstrap";
import Post from "./Post";
import * as imageApi from "../../api/image-api";

const pageSize = 4;

class TimelineRoute extends Component {

    state = {
        images: [],
        pageNumber: 0,
        isLoading: false,
        isEnd: false
    };

    async _handleLoadMore() {
        const {images, pageNumber} = this.state;
        this.setState({isLoading: true});
        try {
            const data = await imageApi.getImages({page_number: pageNumber, page_size: pageSize});
            this.setState({images: images.concat(data.images), isLoading: false, pageNumber: pageNumber + 1});
            if (data.images.length < pageSize) {
                this.setState({isEnd: true});
            }
        }
        catch (err) {
            // alert(err.message);
            this.setState({isLoading: false});
        }
    }

    _renderImageList(images) {
        return images.map(
            (image) => (
                <Col xs={12}
                     className="d-flex justify-content-center"
                     style={{padding: 0, margin: 0}}>
                    <Col md={8} sm={6}
                         className="timeline-list"
                         style={{
                             marginBottom: 60,
                         }}
                    >
                        <Post
                            imageUrl={image.url}
                            author={image.author}
                            caption={image.caption}
                        />
                    </Col>
                </Col>
            )
        )
    }

    async componentDidMount() {
        const {pageNumber} = this.state;
        this.setState({isLoading: true});
        try {
            const {images} = await imageApi.getImages({page_size: pageSize});
            this.setState({images, isLoading: false, pageNumber: pageNumber + 1});
            if (images.length < pageSize) {
                this.setState({isEnd: true});
            }
        }
        catch (err) {
            alert(err.message);
            this.setState({isLoading: false});
        }
    }

    render() {
        const {images, isLoading, isEnd} = this.state;

        return (
            <Container className="page">
                <Row
                    className='d-flex justify-content-center'
                    style={{marginTop: 40}}
                >
                    {this._renderImageList(images)}
                </Row>
                {
                    !isEnd ? (
                        <Row
                            className='d-flex justify-content-center'
                        >
                            <Col md={8} sm={6}
                                 className="timeline-list"
                            >
                                <Button
                                    color="secondary"
                                    style={{
                                        width: "100%",
                                        marginBottom: 20
                                    }}
                                    disabled={isLoading}
                                    onClick={this._handleLoadMore.bind(this)}
                                >Tải thêm</Button>
                            </Col>
                        </Row>
                    ) : null
                }
            </Container>
        )
    }
}

export default TimelineRoute;
