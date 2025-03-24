import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IPFSFile = {
  cid: string;
  created_at: string;
  group_id: string | null;
  id: string;
  keyvalues: any;
  mime_type: string;
  name: string;
  number_of_files: number;
  size: number;
};
