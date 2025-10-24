import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Heading, Icon, CloseIcon } from '@gluestack-ui/themed';
import { LabelTag } from './LabelTag';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

type modalItem = {
  id: number,
  name: string,
  color: string
}

/**
 * ラベルリストモーダルのプロパティ
 *
 * @param props
 * @returns
 */
type LabelListModalProps = {
  visible: boolean;                     // 表示フラグ
  title: string;                        // タイトル
  data: modalItem[];                    // 表示コンテンツ(（複数）
  onPress: (labelId?: number) => void;  // ラベル押下時の処理
  onClose: () => void;                  // 閉じるが押下されたときの処理
}

/**
 * ラベルリストモーダル
 *
 * @param props
 * @returns
 */
const LabelListModal = (props: LabelListModalProps) => {
  const {visible, title, data, onPress, onClose} = props

  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
    >
      {/* ModalBackdropはModal表示時に後ろに薄いブラックのレイヤーをいれる */}
      <ModalBackdrop />
      <ModalContent width="85%" backgroundColor='#FFF'>
        <ModalHeader>

          {/* タイトル */}
          <Heading size="lg">{title}</Heading>

          {/* 閉じるボタン */}
          <ModalCloseButton>
            {/* 以下のIconはreactnativeのvector-iconsではなく、gluestack-uiのIcon。asの部分はvector-iconsのnameに相当する */}
            <Icon size="lg" as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>

        {/* コンテンツ */}
        <ModalBody>
          {/* ラベル解除 */}
          <TouchableOpacity style={sytles.cancelContainer} onPress={() => onPress(undefined)}>
            <MaterialCommunityIcons name="label-off" size={24} color="gray" />
            <Text style={sytles.cancelTagText}>ラベル解除</Text>
          </TouchableOpacity>

          {/* ラベルリストの表示 */}
          {data.map(label => (
            // TouchableOpacityでラッピングすることで本来イベント動作がないコンポーネントをイベント処理できるようにする
            <TouchableOpacity
              style={sytles.labelTag}
              key={label.id}
              onPress={() => onPress(label.id)}
            >
              <LabelTag
                color={label.color}
                name={label.name}
              />
            </TouchableOpacity>
          ))}
        </ModalBody>
    </ModalContent>
  </Modal>
  )
}

const sytles = StyleSheet.create({
  labelTag: {
    marginVertical: 5
  },
  cancelTagText: {
    marginLeft: 5
  },
  cancelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  }
})

export {LabelListModal}
