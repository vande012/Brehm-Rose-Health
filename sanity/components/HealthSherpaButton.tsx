import React from 'react'
import { Button, Card, Stack, Text } from '@sanity/ui'
import { LinkIcon } from '@sanity/icons'

const HealthSherpaButton = () => {
  const handleClick = () => {
    window.open('https://www.healthsherpa.com/?_agent_id=barbara-rose', '_blank')
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text>Click the button below to open Health Sherpa in a new tab:</Text>
        <Button
          text="Open Health Sherpa"
          tone="primary"
          icon={LinkIcon}
          onClick={handleClick}
        />
      </Stack>
    </Card>
  )
}

export default HealthSherpaButton