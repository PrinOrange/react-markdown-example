export const customImg = (props: JSX.IntrinsicElements["img"]) => {
  // Now you can receive origin img attributes by props.
  return (
    <div className="flex flex-col">
      <img className="mx-auto my-0" src={props.src} />
      <figcaption className="p-0 text-center mx-auto text-sm text-gray-500">
        {props.alt}
      </figcaption>
    </div>
  );
};
