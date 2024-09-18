import {openUploadWidget} from "../../utils/CloudinaryService"

const CloudinaryUpload = ({setUrl , setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dnrxtm9fo",
                uploadPreset: "n7lvxetk",
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    console.log(result.info);
                setUrl(result.info.secure_url);
                setName(result.info.original_filename);
                    
                } else {
                    if (error) {
                        console.log("not upload");
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black  rounded-full p-4 font-semibold"
            onClick={uploadImageWidget}
        >
            Select Track
        </button>
    );
};

export default CloudinaryUpload;