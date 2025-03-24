import { title } from "@/components/primitives";
import UploadFile from "@/components/uploadFile";

export default function UploadPage() {
  return (
    <div>
      <h1 className={title()}>Upload a file</h1>
      <UploadFile />
    </div>
  );
}
