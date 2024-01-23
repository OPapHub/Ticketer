using AutoMapper;
using Ticketer.Models;
using TicketerApi.Dto.UserDto;

namespace Ticketer.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserRegisterRequest>().ReverseMap();
        }
    }
}
