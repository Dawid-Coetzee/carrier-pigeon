import ReactCrop from "react-image-crop";
import Image from "next/image";
import { ComponentProps } from "react";

type Props = Pick<
    ComponentProps<typeof Image>, 
    "src" | "alt" | "width" | "height" | "onLoad"
> & ComponentProps<typeof ReactCrop>;

export default function Cropper({
    src, 
    alt, 
    width, 
    height, 
    onLoad, 
    ...props
}: Props) {
    return (
        <div className="w-full min-h-cropping-container-height bg-text1 p-2 items-center justify-center">
            <ReactCrop 
                {...props}
            >
                <Image 
                    src={src} 
                    alt={alt}
                    width={width} 
                    height={height} 
                    onLoad={onLoad}
                />
            </ReactCrop>
        </div>
    );
}
