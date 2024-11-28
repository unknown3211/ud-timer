function TimerVisible(bool)
    SendNUIMessage({
        event = "setVisible",
        visible = bool
    })
end

RegisterNetEvent('hud:setHudTimer')
AddEventHandler('hud:setHudTimer', function(timeInSeconds)
    TimerVisible(true)
    SendNUIMessage({
        event = "setTimer",
        timeLeft = timeInSeconds
    })
end)

-- Test Commands --

RegisterCommand('vehdealertimer', function()
    TriggerEvent('hud:setHudTimer', 7200)
end)

RegisterCommand('hidehud', function()
    TimerVisible(false)
end)