using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //first parameter represents where we map from and second parameter defines
            //where we map to 
            CreateMap<Activity, Activity>();
        }
    }
}