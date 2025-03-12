import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState, ReactNode } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import VcInput from "./vcinput";
import { APP_COLOR } from "@/utils/constant";

interface IOptionInput {
  labelInput: string;
  valueInput?: () => string
}
type SweetAlertProps = {
  title?: string;
  text?: string;
  showCancelButton?: boolean;
  showIcon?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm?: (v?: any) => void;
  onClose?: () => void;
  type?: "info" | "success" | "danger" | "warning" | "question" | "setting";
  optionInput?: IOptionInput
};

const style = StyleSheet.create({
  customSweetAlertOuter: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  customSweetAlertBox: {
    width: "90%",
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  customSweetAlertIcon: {
    height: 80,
    width: 80,
    borderColor: "#009ddf",
    borderWidth: 2,
    borderRadius: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  customAlertIconFa: {
    color: "#009ddf",
  },
  customSweetAlertTitle: {
    fontSize: 25,
    color: "rgba(0,0,0,0.7)",
    marginBottom: 2,
    textAlign: "center",
  },
  customSweetAlertText: {
    fontSize: 17,
    textAlign: "center",
  },
  customSweetAlertButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    gap: 10,
  },
  customSweetAlertButton: {
    height: 35,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  customSweetAlertButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

const SweetAlert: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [cancelButtonText, setCancelButtonText] = useState<string>("");
  const [confirmButtonText, setConfirmButtonText] = useState<string>("");
  const [onConfirm, setOnConfirm] = useState<(v?: any) => void>((v?: any) => { });
  const [onClosing, setOnClosing] = useState<() => void>(() => { });
  const [iconName, setIconName] = useState<string>("");
  const [iconColor, setIconColor] = useState<string>("");
  const [optionInput, setOptionInput] = useState<IOptionInput>();
  const [inputValue, setInputValue] = useState<string>("");

  const handleConfirm = () => {
    setShowModal(false);
    if (onConfirm) onConfirm({ inputValue: inputValue });
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      if (onClosing) onClosing();
    }, 200);
  };

  const showSweetAlert = (params: SweetAlertProps) => {

    const {
      title,
      text,
      showCancelButton,
      cancelButtonText,
      confirmButtonText,
      onConfirm,
      onClose,
      type,
      showIcon,
      optionInput
    } = params;
    setTitle(title ?? "");
    setText(text ?? "");
    setShowCancelButton(showCancelButton ?? false);
    setShowIcon(showIcon ?? true);
    setCancelButtonText(cancelButtonText ?? "Hủy bỏ");
    setConfirmButtonText(confirmButtonText ?? "Xác nhận");
    setOnConfirm((v?: any) => onConfirm);
    setOnClosing(() => onClose);
    setOptionInput(optionInput);

    if (optionInput) setInputValue(optionInput.valueInput ? optionInput.valueInput() : "");
    switch (type) {
      case "info":
        setIconName("info");
        setIconColor(APP_COLOR.BLUE);
        break;
      case "success":
        setIconName("check");
        setIconColor(APP_COLOR.GREEN);
        break;
      case "danger":
        setIconName("times");
        setIconColor(APP_COLOR.RED);
        break;
      case "warning":
        setIconName("exclamation");
        setIconColor(APP_COLOR.YELLOW);
        break;
      case "question":
        setIconName("question");
        setIconColor(APP_COLOR.YELLOW);
        break;
      case "setting":
        setIconName("cogs");
        setIconColor(APP_COLOR.PURPLE);
        break;
      default:
        setIconName("info");
        setIconColor(APP_COLOR.BLUE);
        break;
    }
    setShowModal(true);
  };

  showSweetAlertRef = showSweetAlert;

  return (
    <>
      <Modal animationType="fade" visible={showModal} transparent={true}>
        <View style={style.customSweetAlertOuter}>
          <Animatable.View animation="bounceIn" style={style.customSweetAlertBox}>
            {showIcon && <Animatable.View
              animation="jello"
              duration={500}
              style={[
                style.customSweetAlertIcon,
                {
                  borderColor: iconColor,
                },
              ]}
            >
              <Animatable.View duration={1600} animation="rubberBand">
                <FontAwesome5
                  size={38}
                  style={[
                    style.customAlertIconFa,
                    {
                      color: iconColor,
                    },
                  ]}
                  name={iconName}
                />
              </Animatable.View>
            </Animatable.View>}
            {title && <Text style={style.customSweetAlertTitle}>{title}</Text>}
            {text && <Text style={style.customSweetAlertText}>{text}</Text>}
            <View style={{ width: "100%" }}>
              {optionInput && <VcInput label={optionInput.labelInput} value={inputValue} onChangeText={setInputValue} />}
            </View>
            <View style={style.customSweetAlertButtons}>
              {showCancelButton && (
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    style.customSweetAlertButton,
                    {
                      backgroundColor: "#fff",
                      borderColor: iconColor,
                      borderWidth: 1
                    },
                  ]}
                >
                  <Text
                    style={[
                      style.customSweetAlertButtonText,
                      {
                        color: iconColor
                      },
                    ]}
                  >
                    {cancelButtonText}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleConfirm}
                style={[
                  style.customSweetAlertButton,
                  {
                    backgroundColor: iconColor,
                  },
                ]}
              >
                <Text
                  style={[
                    style.customSweetAlertButtonText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  {confirmButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </Modal>
    </>
  );
};

let showSweetAlertRef: (params: SweetAlertProps) => void;

export const showSweetAlert = (params: SweetAlertProps) => {
  if (showSweetAlertRef) {
    showSweetAlertRef(params);
  }
};

export default SweetAlert;