import { useRef, useState, useEffect } from "react";

function InputImg() {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    // Este useEffect será chamado sempre que o estado 'image' mudar
    // e a imagem será exibida imediatamente
  }, [image]);

  return (
    <div>
      <div
        onClick={() => inputRef?.current}
        className="flex items-center justify-content center"
      >
        {image ? (
          <img
            src={image}
            alt="Ícone Usuário"
            className="img-display-after h-[80px] w-[80px] rounded-[100px]"
          />
        ) : (
          <img
            src="https://imgs.search.brave.com/swltVmzqVmPnf6QxTWZbTiEmvCCvN-bPbotwY707iOg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
            alt="Ícone Usuário"
            className="h-[80px] w-[80px] rounded-[100px]"
          />
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default InputImg;
