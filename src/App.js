import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiPostNoticeWrite } from "./api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const notify = () => toast("글 작성이 완료 되었습니다.");
  const navigate = useNavigate();
  const { mutate } = useMutation(apiPostNoticeWrite, {
    onSuccess: (data) => {
      if(data.result === true){
        notify();
        reset();
        navigate("/");
      }
    },
  });
  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="w-full flex justify-center py-16">
      <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl w-full flex flex-col space-y-4"
      >
        <input
          {...register("title")}
          className="py-1 px-2 border"
          type="text"
          placeholder="title"
        />

        <input
          {...register("writer")}
          className="py-1 px-2 border"
          type="text"
          placeholder="writer"
        />

        <textarea
          rows="10"
          className="py-1 px-2 border"
          type="text"
          placeholder="description"
          {...register("description")}
        ></textarea>

        <button type="submit" className="py-1 bg-red-500 text-white">
          글쓰기
        </button>
      </form>
    </div>
  );
}

export default App;
