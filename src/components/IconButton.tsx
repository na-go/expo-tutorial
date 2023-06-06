import { Pressable, StyleSheet, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'

interface IconButtonProps {
  icon?: 'refresh' | 'save-alt'
  label?: string
  onPress?: () => void
}

export const IconButton: FC<IconButtonProps> = ({ icon, label, onPress }) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
})
