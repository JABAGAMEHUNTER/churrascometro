import { useNavigate } from "react-router-dom";
import { nomesAlimentos } from "../types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styles from "./CalculadoraChurrasco.module.css";

const esquemaValidacao = Yup.object().shape({
  pessoas: Yup.number()
      .min(1,"Deve haver pelo menos 1 pessoa")
      .required("Numero de pessoas é obrigatório"),
  selecaoAlimentos: Yup.array()
      .of(Yup.string())
      .test(
        "check-selecaoAlimentos",
        "Selecione pelo menos um elemento",
        (array) => array !== null && array!.length > 0
      ),
    });

const CalculadoraChurrasco = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
    <Formik
      initialValues={{pessoas: 0, selecaoAlimentos: [] }} 
      validationSchema={esquemaValidacao}  
      onSubmit={(values) => {
        navigate("/resultado",{
          state: {
            pessoas: values.pessoas,
            alimentosSelecionados: values.selecaoAlimentos,
          },
        });
      }}>
      {({ errors, touched }) => ( 
      <Form>
        <div className={styles.inputGroup}>
          <label htmlFor="pessoas"
          className={styles.inputLabel}>
            Numero de Pessoas:
          </label>
          <Field
            name="pessoas" type="number"
            className={styles.inputField}
          />
          {errors.pessoas && touched.pessoas ? (
          <div className={styles.error}>{errors.pessoas}
          </div>) : null}
        </div>
        <h2>Selecione os alimentos para o churrasco</h2>
        {Object.keys(nomesAlimentos).map((alimento) => (
          <div key={alimento}>
            <label>
            <Field 
            type="checkbox"
            name="selecaoAlimentos"
            value={alimento}
            />
            {nomesAlimentos[alimento]}
            </label>
          </div>
        ))}
        {errors.selecaoAlimentos ? (
         <div className={styles.error}>{errors.selecaoAlimentos}</div>
        ): null}
        <button type="submit" className=
          {styles.calculateButton}>
        Calular
        </button>
      </Form>
     )}
    </Formik>
  </div>
  );
};

export default CalculadoraChurrasco;
