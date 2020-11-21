import React, {useState} from "react"
import FileUploadProgress from "react-fileupload-progress"
import "./CohertForm.css"

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEXP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})|https?:|ftp?:|http:?|file:?/gi;

const styles = {
    progressWrapper: {
        height: '50px',
        marginTop: '10px',
        width: '400px',
        float: 'left',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
    },
    progressBar: {
        float: 'left',
        width: '0',
        height: '100%',
        fontSize: '12px',
        lineHeight: '20px',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#5cb85c',
        WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        WebkitTransition: 'width .6s ease',
        Otransition: 'width .6s ease',
        transition: 'width .6s ease'
    },
    cancelButton: {
        marginTop: '5px',
        WebkitAppearance: 'none',
        padding: 0,
        cursor: 'pointer',
        background: '0 0',
        border: 0,
        float: 'left',
        fontSize: '21px',
        fontWeight: 700,
        lineHeight: 1,
        color: '#000',
        textShadow: '0 1px 0 #fff',
        filter: 'alpha(opacity=20)',
        opacity: '.2'
    },

    bslabel: {
        display: 'inline-block',
        maxWidth: '100%',
        marginBottom: '5px',
        fontWeight: 700
    },

    bsHelp: {
        display: 'block',
        marginTop: '5px',
        marginBottom: '10px',
        color: '#737373'
    },

    bsButton: {
        fontSize: '12px',
        lineHeight: '1.5',
        borderRadius: '3px',
        color: '#fff',
        backgroundColor: '#337ab7',
        borderColor: '#2e6da4',
        display: 'inline-block',
        padding: '6px 12px',
        marginBottom: 0,
        fontWeight: 400,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        backgroundImage: 'none',
        border: '1px solid transparent'
    },
    customList: {
        listStyleType: "none",
        paddingLeft: 0
    }

};

const CohortForm = () => {

    const [url, setUrl] = useState("")

    const [email, setEmail] = useState("")

    const [reportFile, setReportFile] = useState(null)

    const formGetter = () => new FormData(document.getElementById('customForm'));

    const isValidateEmailAndURL = email.match(EMAIL_REGEXP) && url.match(URL_REGEXP) && url && email

    const customFormRenderer = (onSubmit) => (
        <form id='customForm' style={{marginBottom: '15px'}}>
            <div className="d-flex">
                <div className="custom-file col-sm-2 d-inline">
                    <input type="file" name='file' className="custom-file-input d-inline" id="exampleInputFile"
                           onChange={(e) => setReportFile(e.target.files[0])}
                           disabled={!(isValidateEmailAndURL)}/>
                    <label className="custom-file-label d-inline" htmlFor="customFile">Select Report File...</label>
                </div>
                <div className="d-inline ml-3">
                    <p>{(reportFile && reportFile.name) || ""}</p>
                </div>
            </div>
            <small className="form-text text-muted">Uploading your file may take a minute if it's large.Please wait
                for it to finish.
            </small>
            <div className="form-header">3.Receive your Analysis!</div>
            <div className="mt-3 ml-3 field" style={{margin: "-21px"}}>You should receive your cohort analysis in your
                inbox within 5 minutes.
            </div>
            <button type="button" className="btn custom-button ml-3 mt-5 mb-5" onClick={onSubmit}
                    disabled={!(isValidateEmailAndURL && reportFile)}>Submit
            </button>
        </form>
    )

    const customProgressRenderer = (progress, hasError, cancelHandler) => {
        if (hasError || progress > -1) {
            let barStyle = Object.assign({}, styles.progressBar);
            barStyle.width = progress + '%';

            let message = (<span>{barStyle.width}</span>);
            if (hasError) {
                barStyle.backgroundColor = '#d9534f';
                message = (<span style={{'color': '#a94442'}}>Failed to upload ...</span>);
            }
            if (progress === 100) {
                message = (<span>SuccessFully Uploaded</span>);
            }
            return (
                <div style={{position: "relative", bottom: "285px"}}>
                    <div style={styles.progressWrapper}>
                        <div style={barStyle}></div>
                    </div>
                    <button style={styles.cancelButton} onClick={cancelHandler}>
                        <span>&times;</span>
                    </button>
                    <div style={{'clear': 'left'}}>
                        {message}
                    </div>
                </div>

            );
        } else {
            return;
        }
    }

    return (
        <div className="container">
            <div className="header">Cohort Analysis(beta)</div>
            <div className="mt-2">lorem ipsum dolor....</div>
            <div className="form-header">1. Enter Your Information</div>
            <form>
                <div className="form-group col-sm-4 mt-3">
                    <label htmlFor="store">Store Url</label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        id="store"
                        aria-describedby="storeId"
                        placeholder="maelove.com"
                    />
                </div>
                <div className="form-group col-sm-4 mt-4">
                    <label htmlFor="email">E-mail Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        aria-describedby="emailId"
                        placeholder="joe@maelove.com"
                    />
                    <small id="emailId" className="form-text text-muted">
                        Your analysis report will be emailed to this address
                    </small>
                </div>
            </form>
            <div className="form-header">2.Upload your Sales Report</div>
            <div className="ml-3">
                <div className="field mt-3">
                    <ul style={styles.customList}>
                        <li>The only fields needed are:</li>
                        <li>Customer Id</li>
                        <li>Order Id</li>
                        <li>Date</li>
                        <li>Total Sales</li>
                    </ul>
                </div>
                <div className="field mb-3 mt-4">
                    We do not need any personal customer fields. Please don't include it.
                </div>
                <div>
                    <FileUploadProgress
                        key='ex2' url='http://localhost:3002/api/upload' method='post'
                        onProgress={(e, request, progress) => {
                            console.log('progress', e, request, progress);
                        }}
                        onLoad={(e, request) => {
                            console.log('load', e, request);
                        }}
                        onError={(e, request) => {
                            console.log('error', e, request);
                        }}
                        onAbort={(e, request) => {
                            console.log('abort', e, request);
                        }}
                        formGetter={formGetter.bind(this)}
                        formRenderer={customFormRenderer.bind(this)}
                        progressRenderer={customProgressRenderer.bind(this)}
                    />

                </div>
            </div>
        </div>
    )

}
export default CohortForm