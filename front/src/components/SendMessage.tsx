import { useState } from "react";

interface ISendMessageProps {
  onCreate: any
}

export const SendMessage = (props: ISendMessageProps) => {

  const [local_state, setLocalState] = useState({ body: "" });
  const { onCreate } = props;
  let message: any;

  const handleChange = (name: string, ev: any) => {
    setLocalState((l) => ({ ...l, [name]: ev.target.value }))

  }

  const submit = async (e: any) => {
    e.preventDefault();
    await onCreate({ body: local_state.body });
    message.value = "";
  }

  return (
    <form onSubmit={e => submit(e)} style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: '60px'
    }}>
      <input
        ref={m => {
          message = m;
        }}
        name="body"
        placeholder="Write something..."
        onChange={e => handleChange("body", e)}
        className="message-input"
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          fontSize: "16px",
          padding: "30px",
          width: "100%",
        }}
      />
    </form>
  );
}