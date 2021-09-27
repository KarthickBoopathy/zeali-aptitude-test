using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Helpers
{
    public interface IErrorCode
    {
        ErrorDTO Error(int errorCode);
    }
}
