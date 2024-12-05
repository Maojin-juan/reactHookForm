// import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Input = ({ id, labelText, type }) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        className="rounded-md border p-2"
        // {...register(id, rules)}
      />
    </>
  );
};

function App() {
  // const { register } = useForm({ mode: "onTouched" });
  // const [count, setCount] = useState(0);

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <div>
      <form className="flex flex-col gap-4" action="">
        <div className="flex flex-col gap-4">
          <Input id="username" type="text" labelText="使用者名稱"></Input>
        </div>
        <div className="flex flex-col">{/* <Input></Input> */}</div>

        <label htmlFor="tel">電話</label>
        <input name="tel" type="tel" className="rounded-md border p-2" />

        <div className="flex justify-between space-x-4">
          <div className="flex w-full flex-col gap-4">
            <label htmlFor="city">縣市</label>
            <select
              className="rounded-md border p-2"
              name="city"
              id=""
            ></select>
          </div>
          <div className="flex w-full flex-col gap-4">
            <label htmlFor="cityArea">鄉鎮市區</label>
            <select
              className="rounded-md border p-2"
              name="cityArea"
              id=""
            ></select>
          </div>
        </div>

        <label htmlFor="address">地址</label>
        <input
          name="address"
          type="address"
          className="rounded-md border p-2"
        />

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="vegetarian">素食者</label>
          <input type="radio" name="vegetarian" />
          <input type="radio" name="vegetarian" />
        </div>

        <label htmlFor="annotation" className="">
          註解
        </label>
        <textarea
          className="h-28 rounded-md border p-2"
          value="餐點很不錯喔"
          name="annotation"
          id=""
        ></textarea>
      </form>
    </div>
  );
}

export default App;
