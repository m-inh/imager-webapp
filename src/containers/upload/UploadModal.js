import React, {Fragment} from 'react';
import propTypes from 'prop-types';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormText} from 'reactstrap';
import * as s3Api from "../../api/s3-api";
import * as imageApi from "../../api/image-api";
import {delay} from "../../utils/timeout-utils";
import UploadService from "../../services/UploadService";

const defaultState = {
    previewUrl: null,
    imageName: null,
    caption: "",
    isUploading: false,
    isLoading: false,
    error: null
};

class UploadModal extends React.Component {

    state = {...defaultState};

    async _handleUpload() {
        const {onClose} = this.props;
        const {previewUrl, imageName, caption} = this.state;

        if (caption.length > 64) return alert("Tiêu đề không được vượt quá 64 kí tự");

        this.setState({isLoading: true});

        try {
            const {} = await imageApi.createImage({name: imageName, caption});
            await delay(1000);
            UploadService.set(previewUrl);
            onClose(previewUrl);
        }
        catch(err) {
            alert(err.message);
            this.setState({isLoading: false});
        }
    }

    _handleInputChange(id, event) {
        const value = event.target.value;
        this.setState({
            [id]: value,
            error: ''
        });
    }

    async _handleFileInputChange() {
        const files = document.getElementById('selectedImage').files;
        const file = files[0];
        if (file == null) {
            return;
        }

        this.setState({isUploading: true, previewUrl: null, imageName: null});

        try {
            const {signedRequest, url, name} = await s3Api.getSignedUrl({fileType: file.type, fileName: file.name});
            await s3Api.createS3Object({file, signedRequest});
            this.setState({previewUrl: url, imageName: name, isUploading: false});
        }
        catch (err) {
            alert(err.message);
            this.setState({isUploading: false});
        }
    }

    componentWillReceiveProps() {
        this.setState({...defaultState});
    }

    render() {
        const {isShown, onClose} = this.props;
        const {isUploading, isLoading, imageName, previewUrl, caption} = this.state;

        return (
            <Modal isOpen={isShown} className={this.props.className}>
                <ModalHeader>Tải lên ảnh của bạn</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Tiêu đề</Label>
                        <Input
                            type='text'
                            value={caption}
                            onChange={(event) => this._handleInputChange('caption', event)}
                        />
                        <FormText color="muted">Giới hạn 64 kí tự</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Input type="file" name="file" id="selectedImage"
                               disabled={isUploading || isLoading}
                               onChange={this._handleFileInputChange.bind(this)}
                        />
                        <FormText color="muted">Lưu ý: Ảnh này sẽ được chia sẻ với mọi người dùng Imager.</FormText>
                        {
                            isUploading ? (
                                <Fragment>
                                    <br/>
                                    <span>Uploading ...</span>
                                </Fragment>
                            ) : null
                        }
                        {
                            previewUrl ? (
                                <Fragment>
                                    <br/>
                                    <img src={previewUrl} width="100%" style={{borderRadius: 3}}/>
                                </Fragment>
                            ) : null
                        }
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary"
                            onClick={() => onClose()}>Hủy</Button>{' '}
                    <Button color="primary"
                            disabled={isUploading || !imageName || isLoading}
                            onClick={this._handleUpload.bind(this)}>Đăng lên bảng tin</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

UploadModal.propTypes = {
    isShown: propTypes.bool,
    onClose: propTypes.func
};

export default UploadModal;