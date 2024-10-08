import { Modal } from "react-bootstrap";
import React, {useState} from "react";
import { useFormik } from "formik";
import { groupSchema } from "../../../validation-schema";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { notifyError, notifySuccess } from "../../../toast.notification";
import { useNavigate } from "react-router-dom";


const GroupAddModal = ({setShow, show, currentAuthState}) => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        name: '',
        description: '',
    };

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: groupSchema,
        onSubmit: async (values, action) => {
            try{
                if(!file){
                    setFileError('File is Required');
                }                

                console.log(file)
                const formData = new FormData();
                formData.append('thumbnail', file);
                formData.append('name', values.name);
                formData.append('description', values.description);

                console.log(formData);
                
                                
                
                setIsLoading(true);
                const res = await axiosPrivate.post('/user/group/create', formData, {
                    headers: {
                              'content-type': 'multipart/form-data'
                          }
                });
                if(res.status === 200){
                    notifySuccess('Group created successfully');
                    navigate(`/${currentAuthState.user.role.toLowerCase()}/group/${res.data.newGroup.id}`);
                    action.resetForm();   
                }else{
                    console.log(res);
                }
                setShow(false);
                setIsLoading(false);
            }catch(err){
                console.log(err);
                setIsLoading(false);
                notifyError(err.response.data.message);
            }
        }
    });

    const [file, setFile] = useState({})
    const [fileError, setFileError] = useState('');


    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <h5 className="modal-title mt-">Create New Group</h5>
                    <button type="button" className="close" onClick={() => setShow(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Group Logo</label>
                            <input type="file"
                                className="form-control-file"
                                placeholder=""
                                autoComplete={'off'}
                                onChange={(event) => {
                                    setFileError('')
                                    setFile(event.currentTarget.files[0]);
                                  }}
                                onBlur={handleBlur}
                                accept="image/*"
                            />
                            {
                                fileError ? (
                                    <ul className="parsley-errors-list filled">
                                        <li>{fileError}</li>
                                    </ul>
                                ): null
                            }
                            {/* {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="Group Logo Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
                            </div>
                        )} */}
                        </div>
                        <div className="form-group">
                            <label>Group Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                autoComplete={'off'}
                                name={'name'}
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                touched.name && errors.name ? (
                                    <ul className="parsley-errors-list filled">
                                        <li>{errors.name}</li>
                                    </ul>
                                ): null
                            }
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea type="text"
                                className="form-control"
                                placeholder=""
                                autoComplete={'off'}
                                name={'description'}
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </textarea>
                            {
                                touched.description && errors.description ? (
                                    <ul className="parsley-errors-list filled">
                                        <li>{errors.description}</li>
                                    </ul>
                                ): null
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className={'btn btn-sm btn-danger'} onClick={() => setShow(false)}>
                        Cancel
                    </button>
                        {
                            isLoading ? <button className={'btn btn-sm btn-primary'}>
                            Processing....
                        </button> : <button type="button" onClick={handleSubmit} className={'btn btn-sm btn-primary'}>
                            Submit
                        </button>
                        }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default GroupAddModal;