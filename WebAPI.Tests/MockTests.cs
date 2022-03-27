using Xunit;
using FluentAssertions;
using System;

namespace WebAPI.Tests
{
    public class MockTests
    {
        private const string MockExceptionMsg = "Something went wrong...";

        [Fact]
        public void MockTest1()
        {
            //Arrange
            var a = 2;
            var b = 3;

            //Act
            var result = a * b;

            //Assert
            Assert.Equal(6, result);
        }

        [Fact]
        public void MockTest2()
        {
            //Arrange
            Action someFunc = () => { 
                throw new Exception(MockExceptionMsg); 
            };

            //Act/Assert
            someFunc
                .Should()
                .Throw<Exception>()
                .WithMessage(MockExceptionMsg);
        }
    }
}