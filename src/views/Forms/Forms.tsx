import { useEffect, useMemo, useState } from "react";
import "./Forms.style.scss";
import { selectUser } from "../../redux/selectors/auth.selectors";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import questions from "./questions.json";
import Select from "react-select";
import { updatePreferences } from "../../services/user.services";
import { Bounce, toast } from "react-toastify";
import { thunkRefreshUser } from "../../redux/thunks/auth.thunk";
import { useAppDispatch } from "../../hooks/useDispatch.hook";

interface Question {
  id: number;
  category: string;
  question: string;
  type: string;
  options: Array<string>;
}

const Forms: React.FC = () => {
  const user = selectUser()!;
  const isInversor = !!user?.isInvestor;
  const navigation = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<Array<string> | string>>([]);

  const questionsToRender = useMemo(
    () =>
      questions.filter((q) =>
        isInversor ? q.category === "investor" : q.category === "user"
      ),
    [isInversor]
  ) as Array<Question>;

  const totalQuestions = useMemo(
    () => questionsToRender?.length,
    [questionsToRender]
  );

  useEffect(() => {
    if (user === null) {
      navigation("/login");
    }
    if(user?.preferencesCompleted){
      navigation("/dashboard");
    }
    console.log("questionsToRender :>> ", questionsToRender);
  }, [user]);

  const { handleSubmit } = useForm();

  const dispatch = useAppDispatch();

  // Función para manejar el envío del formulario
  const onSubmit = async () => {
    try {
      const payload = {
        role: isInversor ? "investor" : "user",
        responses: mapAnswersToPayload(answers, questionsToRender)
      };

      console.log("Enviando datos: ", payload);

      const result = await updatePreferences(payload.responses, payload.role);
      console.log("Respuesta del servidor: ", result);
      toast('✅ ¡Respuestas enviadas con éxito!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        await dispatch(thunkRefreshUser())
        navigation("/dashboard");

    } catch (error) {
      console.error("Error al enviar las respuestas: ", error);
      toast('Hubo un error al enviar tus respuestas. Por favor, inténtalo de nuevo.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  };

  // Función para mapear las respuestas según las preguntas
  const mapAnswersToPayload = (answers: Array<Array<string> | string>, questions: Array<Question>) => {
    const responses: { [key: string]: any } = {};

    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer) {
        responses[question.id] = answer;
      }
    });

    return responses;
  };

  const nextQuestion = (value: number) => {
    const current = currentQuestion + value;
    if (current <= totalQuestions && current >= 0) {
      if (current === totalQuestions) {
        handleSubmit(onSubmit)(); // Trigger submit on the last question
        return;
      }
      let increment = currentQuestion + value;
      setCurrentQuestion(increment);
    }
  };

  const handleResponse = (value: string) => {
    let newAnswers = [...answers];

    if (questionsToRender[currentQuestion].type === "checkbox") {
      const hasResponse = Array.isArray(newAnswers[currentQuestion]);
      let valueToSet = value;
      if (hasResponse) {
        const currentAnswers = newAnswers[currentQuestion] as Array<string>;
        if (currentAnswers.includes(value)) {
          valueToSet = currentAnswers.filter((v) => v !== value).join(",");
        } else {
          valueToSet = [...currentAnswers, value].join(",");
        }
      } else {
        valueToSet = value;
      }
      newAnswers[currentQuestion] = valueToSet.split(",");
    } else {
      newAnswers[currentQuestion] = value;
    }

    if (Array.isArray(newAnswers[currentQuestion])) {
      newAnswers[currentQuestion] = (newAnswers[currentQuestion] as string[])?.filter((a) => a !== "");
    }
    console.log("newAnswers :>> ", newAnswers);

    setAnswers(newAnswers);
  };

  const isAnswerProvided = useMemo(() => {
    const answer = answers[currentQuestion];
    const question = questionsToRender[currentQuestion];
    console.log({ answer });
    if (!answer || (Array.isArray(answer) && answer?.length === 0)) return false;

    switch (question.type) {
      case "text":
        return (answer as string).trim() !== ""; // Debe haber texto
      case "select":
        return !!answer; // Debe haber una selección
      case "radio":
        return !!answer; // Debe haber una opción seleccionada
      case "checkbox":
        return Array.isArray(answer) && answer.length > 0; // Al menos una opción seleccionada
      default:
        return false;
    }
  }, [answers, currentQuestion, questionsToRender]);

  const renderInput = (question: Question) => {
    switch (question.type) {
      case "select":
        const options = question.options.map((option: string) => {
          return { value: option, label: option };
        });
        return (
          <Select
            defaultValue={null}
            onChange={(value) => {
              handleResponse(value?.value || value?.label.toLowerCase() || "");
            }}
            options={options}
            isMulti={false}
            className="multiselect-custom"
            placeholder="Selecciona una opción"
          />
        );
      case "text":
        return (
          <input
            type="text"
            name={question.id + ""}
            onChange={(e) => handleResponse(e.target.value)}
            placeholder="Escribe tu respuesta"
          />
        );
      case "checkbox":
      case "radio":
        return (
          <>
            {question.options.map((option: string, index: number) => {
              return (
                <span
                  key={`${index}-${currentQuestion}`}
                  className="forms__container-panel-field"
                >
                  <input
                    type={question.type}
                    name={question.id + ""}
                    id={`${question.id}-${index}`}
                    value={option}
                    onChange={(e) => handleResponse(e.target.value)}
                    checked={
                      question.type === "checkbox"
                        ? answers[currentQuestion]?.includes(option)
                        : answers[currentQuestion] === option
                    }
                  />
                  <label htmlFor={`${question.id}-${index}`}>{option}</label>
                </span>
              );
            })}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="forms__container">
      <form className="forms__container-panel" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="forms__container-panel-title">Ayúdanos a conocerte</h1>
        <p className="forms__container-panel-subtitle">
          Responde las siguientes preguntas para poder ofrecerte un mejor servicio
        </p>
        <section className="forms__container-panel-question">
          {/* Progress bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              height: "0.8rem",
            }}
          >
            <span
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-start",
                backgroundColor: "gray",
                height: "100%",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  backgroundColor: "green",
                  height: "100%",
                  width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                  transition: "width 0.5s",
                }}
              ></span>
            </span>
            <span
              style={{
                textAlign: "right",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              Pregunta {currentQuestion + 1} de {totalQuestions}
            </span>
          </div>
          <label
            htmlFor={questionsToRender.at(currentQuestion)?.id + ""}
            className="forms__container-panel-question-title"
          >
            {questionsToRender.at(currentQuestion)?.question}
          </label>
          {renderInput(questionsToRender[currentQuestion])}
          <span className="forms__container-panel-question-tools">
            <button
              type="button"
              onClick={() => nextQuestion(-1)}
              disabled={currentQuestion === 0 || !isAnswerProvided}
              className="button"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => nextQuestion(1)}
              disabled={!isAnswerProvided}
              className="button"
            >
              {currentQuestion === totalQuestions - 1 ? "Enviar" : "Siguiente"}
            </button>
          </span>
        </section>
      </form>
    </div>
  );
};

export default Forms;
