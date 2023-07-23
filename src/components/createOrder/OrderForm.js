import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import "./OrderForm.css";
import * as Yup from "yup";
//
//
//
//
//
//
export default function OrderForm() {
  // sabit, sayfayla birlikte kayıtlı kalacak olan seçimler // checkboxes

  const [defextras, setDefExtras] = useState([
    "pepperoni",
    "mısır",
    "ananas",
    "jalepeno",
  ]);

  function extrasHandleChange(event) {
    let newExtras;
    const value = event.target.value;
    if (defextras.includes(value)) {
      newExtras = defextras.filter((extras) => extras !== value);
      // extra içeriyor mu
    } else {
      newExtras = [...defextras, value];
      // extra içermiyorsa
    }
    setDefExtras(newExtras);
  }
  // console.log("array click control:",extras);
  //
  //
  //
  // state for form-datas
  const [formData, setFormData] = useState({
    p_size: "",
    p_thickness: "",
    c_note: "",
    c_adress: "",
  });
  //
  //
  //
  //
  // boyut, kalınlık, note, adres için YUP kısmı

  const sema = Yup.object().shape({
    p_size: Yup.string().required("! seçim yapmalısınız"),
    p_thickness: Yup.string().required("! seçim yapmalısınız"),
    c_note: Yup.string().required("! ").min(4, "en az 1 karakter olmalı"),
    c_adress: Yup.string()
      .required("! adresinizi bilmezsem getiremem, illa ki yazacaksınız...")
      .min(4, "en az 1 karakter olmalı"),
  });

  // State for error messages
  const [errors, setErrors] = useState({
    p_size: "",
    p_thickness: "",
    c_note: "",
    c_adress: "",
  });

  ///////FORM OBJECT LİSTENERS

  const [PPrice, setPPrice] = useState(0);
  const [thickness, setThickness] = useState(""); // incelik
  const [PSize, setPSize] = useState("..."); // boyut
  const [Pnmize, setPnmize] = useState("..."); //
  const [note, setNote] = useState(""); // note
  const [adres, setAdres] = useState(""); //adres

  function requiredHandleChange(e) {
    // Radio, Option, Note, Address Listener, ekstras yok henüz!!!
    //
    // P- Boyut
    if (e.target.type === "radio") {
      if (e.target.value === "small") {
        setPPrice(200);
        setPSize(4.0);
        setPnmize(5);
      }
      if (e.target.value === "medium") {
        setPPrice(250);
        setPSize(4.5);
        setPnmize(5);
      }
      if (e.target.value === "large") {
        setPPrice(300);
        setPSize(5.0);
        setPnmize(5);
      }
    }
    //
    // P- Kalınlık
    //
    if (e.target.type === "option") {
      setThickness(e.target.value);
    }
    //
    // adres & note
    //
    if (e.target.type === "text") {
      setAdres(e.target.value);
    }
    if (e.target.type === "textarea") {
      setNote(e.target.value);
    }

    Yup.reach(sema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  // console.log(errors.name);

  // sipariş ver button validation

  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    sema.isValid(formData).then((valid) => {
      setFormValid(valid);
    });
  }, [formData, sema]);

  const PzCountHandlerChange = (e) => {
    e.stopPropagation(); // stops event bubling
    if (e.target.id === "decrease") {
      PNumber > 0 && setPNumber(PNumber - 1);
    } else {
      PNumber < Pnmize && setPNumber(PNumber + 1);
    }
  };

  const [PriceT, setPriceT] = useState(0); // son fiyat
  const [PNumber, setPNumber] = useState(0);
  useEffect(() => {
    setPriceT(PPrice * PNumber + 5 * PNumber);
  }, [PPrice, PNumber]);

  return (
    <div>
      <Header />

      {/* NAV SECTION: */}
      <div>
        <div className="links">
          <ul>
            <NavLink to="/" exact activeClassName="link-color">
              Anasayfa
            </NavLink>

            <span>-</span>

            <NavLink to="/pizza" activeClassName="link-color">
              Seçenekler
            </NavLink>

            <span>-</span>

            <NavLink to="/siparisonayi" activeClassName="link-color">
              Siparişi Oluştur
            </NavLink>
          </ul>
        </div>

        {/* PRODUCT INDEX TOPIC: */}

        <div className="product-order">
          <div className="forms">
            <br />
            <div className="prd-name">
              <h3>Position Absolute Acı Pizza</h3>
            </div>
            <br />
            <div className="prd-count">
              <h3>{PPrice} ₺</h3>
              <p>{PSize}</p>
              <p>({Pnmize}Adet)</p>
            </div>
            <br />
            <div className="prd-prg">
              <p>
                Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
                acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
                çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel
                olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
                genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan
                oluşan İtalyan kökenli lezzetli bir yemektir..Küçük bir pizzaya
                bazen pizzetta denir.
              </p>
            </div>

            {/* FORM:  */}

            <form id="pizza-form">
              {/* CHOISE YOUR OWN PIZZA: */}

              <div className="form-first-part">
                <div className="options-one">
                  <div className="p_size">
                    <h4>
                      Boyut Seçin <span className="spancolor">*</span>
                    </h4>

                    <label htmlFor="small" className="radios">
                      <input
                        type="radio"
                        id="small"
                        name="size"
                        value="small"
                      />
                      Small
                    </label>
                    <br />

                    <label htmlFor="medium" className="radios">
                      <input
                        type="radio"
                        id="medium"
                        name="size"
                        value="medium"
                      />
                      Medium
                    </label>
                    <br />

                    <label htmlFor="large" className="radios">
                      <input
                        type="radio"
                        id="large"
                        name="size"
                        value="large"
                      />
                      Large
                    </label>
                    <br />
                    {errors.p_size && <h6> {errors.name} </h6>}
                  </div>
                  <div className="p_weight">
                    <h4>
                      Hamur Seçin <span className="spancolor">*</span>
                    </h4>

                    <select
                      id="size-dropdown"
                      name="thickness"
                      defaultValue="none"
                    >
                      <option value="none" disabled>
                        Hamur Kalınlığı:
                      </option>
                      <option type="option" value="thin">
                        Thin
                      </option>
                      <option type="option" value="normal">
                        Normal
                      </option>
                    </select>
                    {errors.p_thickness && <h6> {errors.name} </h6>}
                  </div>
                </div>
              </div>

              {/*  CHECKBOX - LİST: */}
              <div className="form-sec-part">
                <div className="options-two">
                  <div>
                    <h4>Ek Malzemeler</h4>
                    <p className="prd-prg">
                      En fazla 10 malzeme seçebilirsiniz. Malzeme başına
                      eklenecek fiyat 5₺'dir.
                    </p>
                  </div>
                  <div className="checkboxes">
                    <label>
                      <input
                        type="checkbox"
                        value="pepperoni"
                        name="extras"
                        checked={defextras.includes("pepperoni")}
                        onChange={extrasHandleChange}
                      />
                      Pepperoni
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="domates"
                        name="extras"
                        checked={defextras.includes("domates")}
                        onChange={extrasHandleChange}
                      />
                      Domates
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="biber"
                        name="extras"
                        checked={defextras.includes("biber")}
                        onChange={extrasHandleChange}
                      />
                      Biber
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sosis"
                        name="extras"
                        checked={defextras.includes("sosis")}
                        onChange={extrasHandleChange}
                      />
                      Sosis
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="mısır"
                        name="extras"
                        checked={defextras.includes("mısır")}
                        onChange={extrasHandleChange}
                      />
                      Mısır
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sucuk"
                        name="extras"
                        checked={defextras.includes("sucuk")}
                        onChange={extrasHandleChange}
                      />
                      Sucuk
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="kanada jambonu"
                        name="extras"
                        checked={defextras.includes("kanada jambonu")}
                        onChange={extrasHandleChange}
                      />
                      Kanada Jambonu
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="salam"
                        name="extras"
                        checked={defextras.includes("salam")}
                        onChange={extrasHandleChange}
                      />
                      Salam
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="ananas"
                        name="extras"
                        checked={defextras.includes("ananas")}
                        onChange={extrasHandleChange}
                      />
                      Ananas
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="tavuk ızgara"
                        name="extras"
                        checked={defextras.includes("tavuk ızgara")}
                        onChange={extrasHandleChange}
                      />
                      Tavuk Izgara
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="jalepeno"
                        name="extras"
                        checked={defextras.includes("jalepeno")}
                        onChange={extrasHandleChange}
                      />
                      Jalepeno
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="kabak"
                        name="extras"
                        checked={defextras.includes("kabak")}
                        onChange={extrasHandleChange}
                      />
                      Kabak
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="soğan"
                        name="extras"
                        checked={defextras.includes("soğan")}
                        onChange={extrasHandleChange}
                      />
                      Soğan
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sarımsak"
                        name="extras"
                        checked={defextras.includes("sarımsak")}
                        onChange={extrasHandleChange}
                      />
                      Sarımsak
                    </label>
                  </div>
                </div>
              </div>

              {/* ORDER NOTES & NAME ADDRESS */}

              <div className="form-th-part">
                <label htmlFor="note" className="note">
                  <h4>Sipariş Notu</h4>
                  <input
                    type="text"
                    id="text-inputs"
                    onChange={requiredHandleChange}
                    value={formData.name}
                    placeholder="Siparişine eklemek istediğin bir not var mı?"
                  />
                </label>
                <br />
                <span className="form-errors">{errors.c_note}</span>
              </div>

              {/* ORDER BUTTON & SUMMARY: */}

              <div className="form-thrht-part">
                <label htmlFor="name-input" className="order-info">
                  <h4>İsim & Adres Bilgisi:</h4>
                </label>
                <textarea
                  type="textarea"
                  id="text-inputs"
                  onChange={requiredHandleChange}
                  value={formData.name}
                  placeholder="please type your name and address"
                ></textarea>
                <br />
                <span className="form-errors">{errors.c_adress}</span>
                <br />
              </div>

              <div className="form-fourt-part">
                <div className="form-dec-inc">
                  <button
                    type="button"
                    id="decrease"
                    onClick={PzCountHandlerChange}
                    disabled={PPrice === 0}
                  >
                    -
                  </button>
                  <h5 data-test-id="pNumber">{PNumber}</h5>
                  <button
                    type="button"
                    id="increase"
                    onClick={PzCountHandlerChange}
                    disabled={PPrice === 0}
                  >
                    +
                  </button>

                  <div>
                    <h5>Sipariş Toplamı</h5>
                    <h6>Ekstra Seçimler</h6>
                    <h6>15 ı ı burası .₺</h6>
                  </div>
                </div>

                <div>
                  <h6>Toplam</h6>
                  <h3>{PriceT} .₺</h3>
                </div>

                <div>
                  <button
                    type="submit"
                    id="order-button"
                    // şimdilik reset checkbox buttonu,değiştireceğim
                    // onClick={() => setExtras([])}
                    // bu buton adres ve isim bilgisi 4 karakterden büyükse aktif oluyor, şimdilik.
                    disabled={!isFormValid}
                  >
                    Sipariş ver
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
