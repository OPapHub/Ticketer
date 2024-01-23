using System.Text.Json.Serialization;

namespace Ticketer.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum MovieState
    {
        Airing,
        Archive,
        Soon
    }
}
