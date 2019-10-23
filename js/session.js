export default{
    name: "session",
    getSession: function()
    {
        return {
            jsessionId: this.getJSessionId(),
            businessId: this.getBusinessId(),
            deviceSessionId: this.getDeviceSessionId(),
            email: this.getEmail(),
            userId: this.getUserId(),//"emmanuel@shopperpos.com",
        };
    },
    setJSessionId: function(jsessionId)
    {
        localStorage.setItem("jsessionId", jsessionId);
    },
    getJSessionId: function()
    {
        return localStorage.getItem("jsessionId");
    },
    setBusinessId: function(businessId)
    {
        localStorage.setItem("businessId",businessId);
    },
    getBusinessId: function()
    {
        return localStorage.getItem("businessId");
    },
    setDeviceSessionId: function(deviceSessionId)
    {
        localStorage.setItem("deviceSessionId", deviceSessionId);
    },
    getDeviceSessionId: function()
    {
        return localStorage.getItem("deviceSessionId");
    },
    setEmail: function(email)
    {
        localStorage.setItem("email", email);
    },
    getEmail: function()
    {
        return localStorage.getItem("email");
    },
    setUserId: function(userId)
    {
        localStorage.setItem("userId", userId);
    },
    getUserId: function()
    {
        return localStorage.getItem("userId");
    },
    getUID: function(email)
    {
        return "web"+(email.replace(/[^0-9A-Z]+/gi,""));
    }
}